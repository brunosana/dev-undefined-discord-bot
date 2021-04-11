import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import mongoose from 'mongoose';
import Router from './Router';
import Commands from './commands';
import messageCodes from './utils/messageCodes';

import { User, UserProps } from './models/user';
import { helpObject as rankHelp } from './commands/rank.command';
dotenv.config();

import prefix  from './utils/config';

const intents = new Intents([
    Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS",
]);
const client = new Client({
    ws: { intents }
});

client.login(process.env.token);

client.on('ready', () => {
    console.log('Bot started...');
    client.user?.setActivity('Calcinha Preta',
    {
        type: 'LISTENING',
        url: 'https://www.youtube.com/user/OficialCalcinha'
    })
    Commands.loadCommands(Router);
    mongoose.connect(process.env.DB_URL || 'localhost', {useNewUrlParser: true});
})

client.on('message', async (message) => {
    if(message.content.charAt(0) === prefix.prefix){
        const command = message.content.split(' ')[0].substring(1);
        try{
            await Router.check(command, client, message);
        }catch(err){
            message.channel.send(`${messageCodes.error} - ${err.message}`);
        }
    }
});

client.on('guildMemberAdd', async (member) => {
    const channel = member.guild.channels.cache.get("welcome-and-rules");
    if(channel && channel.isText()){
        const users = await User.find() as Array<UserProps>;
        const userExists = users.some(user => user.userId === member.user.id);
        if(userExists){
            channel.send(`Welcome Back, @<${member.user.id}>. You already exists on database`);
        }else{
            await User.create({userId: member.user.id, name: member.user.username});
            channel.send(`Welcome, @<${member.user.id}>! You are registered on Undefined Ranking now!! Type ${rankHelp.syntax}`);
        }
    }
})

client.on('disconnect', async () => {
    mongoose.disconnect();
})