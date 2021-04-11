import Discord from 'discord.js';
import config from '../utils/config';

const execute = async (discord: Discord.Client, message: Discord.Message) => {
    if(!message.member){
        throw new Error("Can't catch the author of the message. Please, contact Admin");
    }
    if(!message.member.roles.cache.has(config.marathonManagerRoleId)){
        throw new Error(`Sorry, you have no permission to call this command, only members with  'Marathon Manager' role.`);
    }
}

export {
    execute
}