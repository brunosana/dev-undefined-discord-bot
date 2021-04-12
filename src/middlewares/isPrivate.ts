import Discord from 'discord.js';


const execute = async (client: Discord.Client, message: Discord.Message) => {
    if (message.channel.type !== 'dm'){
        message.delete({timeout: 10});
        throw new Error(`This command is avaliable only in DM chat!`);
    }
}

export {
    execute
}