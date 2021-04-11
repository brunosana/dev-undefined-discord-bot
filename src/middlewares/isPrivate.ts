import Discord from 'discord.js';

import messageCodes  from '../utils/messageCodes.js';
import { User } from '../models/user.js';
import { Marathon } from '../models/marathon.js';

const execute = async (client: Discord.Client, message: Discord.Message) => {
    if (message.channel.type !== 'dm'){
        message.delete({timeout: 10});
        throw new Error('This command is avaliable only in DM chat. Type _!dealer_');
    }
}

export {
    execute
}