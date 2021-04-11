import Discord from 'discord.js';

import messageCodes  from '../utils/messageCodes';
import { User, UserProps } from '../models/user';

interface checkProps{
    points: number;
}

interface fieldProps {
    name: string;
    value: string;
    inline: boolean;
}

const execute = async (client: Discord.Client, message: Discord.Message) => {
    const users = await User.find();
    if(users.length <=0){
        await message.channel.send(`${messageCodes.error} - There are no users on database!`);
    }
    else{
        const usersSorted = users.sort((a: checkProps, b: checkProps) => {
            if(a.points > b.points) return -1;
            if(a.points < b.points) return 1;
        });
        const fields: Array<fieldProps> = [];
        usersSorted.map((user: UserProps) => {
            fields.push({
                name: `${fields.length+1}. ${user.name.toUpperCase()}`,
                value: `${user.points} point${user.points > 0 ? 's' : ''}`,
                inline: false,
            })
        });
        message.channel.send({
            embed: {
                color: 0,
                description: `${messageCodes.success} - Hey <@${message.author.id}>, Here are the official rank of Undefined:`,
                fields
            }
        })
    }
}

const helpObject = {
    name: 'rank',
    description: 'Show current rank of Undefined Server',
    syntax: '!rank'
}

export {
    execute,
    helpObject
};