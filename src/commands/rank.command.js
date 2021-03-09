import messageCodes  from '../utils/messageCodes.js';
import { User } from '../models/user.js';

export default async (client, message) => {
    const users = await User.find();
    const usersSorted = users.sort((a, b) => {
        if(a.points > b.points) return -1;
        if(a.points < b.points) return 1;
    });
    console.log(usersSorted);
    const fields = [];
    usersSorted.map(user => {
        fields.push({
            name: `${fields.length+1}. ${user.name.toUpperCase() }`,
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