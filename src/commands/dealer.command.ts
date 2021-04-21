import Discord from 'discord.js';
import messageCodes  from '../utils/messageCodes';
import { Marathon } from '../models/marathon';
import { User } from '../models/user';

import { helpObject as addHelp } from './add.command';
import { helpObject as newHelp } from './new.command';

const execute = async (client: Discord.Client, message: Discord.Message) => {
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
    message.author.send(`${messageCodes.success} - Hello Dealer xD! You can add problems typing **in my private chat** the command ${addHelp.syntax}`);
    message.channel.send(`${messageCodes.success} - Hey, <@${message.author.id}>, i sent you a private message ;)`);
}

const helpObject = {
    name: 'dealer',
    description: "Use this commmand if you are a dealer. I'll send a private message for you",
    syntax: '!dealer'
}

export {
    execute,
    helpObject
}