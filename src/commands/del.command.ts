import Discord from 'discord.js';

import { helpObject as newHelp } from './new.command';

import { Marathon, MarathonProps } from '../models/marathon';
import { User } from '../models/user';
import messageCodes from '../utils/messageCodes';

interface DeleteMethod extends MarathonProps {
    delete: Function;
}

const execute = async (discord: Discord.Client, message: Discord.Message) => {
    const marathons = await Marathon.find({status: 'CREATED'}) as Array<DeleteMethod>;
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
    await marathons[0].delete();
    message.channel.send(`${messageCodes.success} - The marathon ${marathons[0]._id} has been deleted!`);
}

const helpObject = {
    name: 'del',
    description: 'Delete a Marathon if you are the Marathon Dealer.',
    syntax: '!del'
}

export {
    execute,
    helpObject
}