import Discord from 'discord.js'

const execute = async (discord: Discord.Client, message: Discord.Message) => {
    const channels = message.guild?.channels.cache.array();
    console.log(channels);
}

export {
    execute
}