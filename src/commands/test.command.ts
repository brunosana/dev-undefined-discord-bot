import Discord from 'discord.js'

const execute = async (discord: Discord.Client, message: Discord.Message) => {
    message.channel.send("This is a test");
}

export {
    execute
}