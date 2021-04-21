import Discord from 'discord.js';
import messageCodes  from '../utils/messageCodes';

import { helpObject as loadHelp } from './load.command';

import { Marathon } from '../models/marathon';
import { User } from '../models/user';

const execute = async (client: Discord.Client, message: Discord.Message) => {
        const usersMap = message.mentions.users;
        if(!usersMap){
            throw new Error(`Dealer must be necessary. Please, type _${loadHelp.syntax}_`);
        }
        const users = Array.from(usersMap);
        if(users.length > 1 || users.length <=0){
            throw new Error(`Invalid Dealer data. Please, type _${helpObject.syntax}_`);
        }
        const dealer = users[0][1];
        const dealerExists = await User.findOne({userId: dealer.id});
        if(!dealerExists){
            throw new Error(`Dealer is not on database. Please, type _${loadHelp.syntax}_`);
        }
        const marathons = await Marathon.find();
        marathons.map((m: { status: string; }) => {
            if(m.status === 'CREATED' || m.status === 'IN_PROGRESS'){
                throw new Error('Already a Marathon created or in progress. Please, finish them before to create another.')
            }
        })
        const marathon =  await Marathon.create({dealer: dealerExists._id, points: 0});
        message.channel.send(`${messageCodes.success} - The Marathon has been created: \nId: ${marathon._id} | Dealer: ${dealer.username}!`);

}

const helpObject = {
    name: 'new',
    description: 'Create a new Marathon with a Dealer',
    syntax: '!new @User'
}

export {
    execute,
    helpObject
}