import dotenv from 'dotenv';
import Discord from 'discord.js';
import mongoose from 'mongoose';
dotenv.config();

import prefix  from './utils/config.js';
const client = new Discord.Client();

import commands from './commands/index.js';

client.login(process.env.token);

client.on('ready', () => {
    console.log('Bot started...');
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
})

client.on('message', async (message) => {
    if(message.content.charAt(0) === prefix.prefix){
        await commands(client, message);
    }
});

client.on('disconnect', async () => {
    mongoose.disconnect();
})