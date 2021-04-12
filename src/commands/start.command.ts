import Discord from 'discord.js';

import { Marathon, MarathonProps } from '../models/marathon';
import { User } from '../models/user';
import { helpObject as newHelp } from './new.command';

interface sendMethodProp extends Discord.GuildChannel {
    send: Function;
}

const execute = async (discord: Discord.Client, message: Discord.Message) =>{
    const marathons = await Marathon.find({status: 'CREATED'});
    if(marathons.length > 1){
        throw new Error('An error ocurred, have more than two marathons with "CREATED" status. Please, contact admin.');
    }
    if(marathons.length <=0){
        throw new Error(`Have no opened marathons. Please, type _${newHelp.syntax}_`);
    }
    const dealer = await User.findOne({ _id: marathons[0].dealer });
    if(!(dealer.userId === message.author.id)){
        throw new Error(`Just the dealer of current opened marathon can invoke this command. This thime, the current Dealer is <@${dealer.userId}>`)
    }
    marathons[0].status = 'IN_PROGRESS';
    marathons[0].date = new Date();
    await marathons[0].save();
    if(!message.guild){
        throw new Error("The channel can't be finded, please, contact Admin");
    }
    const channels = message.guild.channels.cache.array();//.get("welcome-and-rules");
    const textChannels = channels.filter(channel => channel.type === "text");
    const welcomeChannels = textChannels.filter(channel => channel.name === "welcome-and-rules");
    if(!welcomeChannels[0]){
        throw new Error("The Marathons is Started but i can't find welcome channel");
    }else{
        const welcomeChannel = welcomeChannels[0] as sendMethodProp;
        welcomeChannel.send(`@everyone The Marathons is Started!! Type _<PROBLEMS>_ to see the problem,`);
    }
}

const helpObject = {
    name: 'start',
    description: "Use this commmand if you are a dealer. I'll send a private message for you",
    syntax: '!start'
}

export {
    execute,
    helpObject
}