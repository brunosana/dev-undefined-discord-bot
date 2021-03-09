import messageCodes  from '../utils/messageCodes.js';
import { User } from '../models/user.js';

export default async (client, message) => {
    await message.channel.send({
        embed: {
            color: 0,
            description: `${messageCodes.success} - This is the help area`,
            fields
        }
    })
}