import messageCodes  from '../utils/messageCodes.js';
import { User } from '../models/user.js';

export default async (client, message) => {
    const users = await User.find();
    if(users.length <=0){
        await message.channel.send(`${messageCodes.error} - There are no users on database!`);
    }
    else{
        const usersSorted = users.sort((a, b) => {
            if(a.points > b.points) return -1;
            if(a.points < b.points) return 1;
        });
        const fields = [];
        usersSorted.map(user => {
            fields.push({
                name: `${fields.length+1}. ${user.name.toUpperCase()}`,
                value: `${user.points} point${user.points > 0 ? 's' : ''}`,
                inline: false,
            })
        });
        await message.channel.send({
            embed: {
                color: 0,
                description: `${messageCodes.success} - Hey <@${message.author.id}>, Here are the official rank of Undefined:`,
                fields
            }
        })
    }
}