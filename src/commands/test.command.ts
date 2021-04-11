import Discord from 'discord.js'
import messageCodes from '../utils/messageCodes';

interface sendMethodProp extends Discord.GuildChannel {
    send: Function;
}

const execute = async (discord: Discord.Client, message: Discord.Message) => {
    if(!message.guild){
        throw new Error("The channel can't be finded, please, contact Admin");
    }
    const channels = message.guild.channels.cache.array();//.get("welcome-and-rules");
    const textChannels = channels.filter(channel => channel.type === "text");
    const welcomeChannels = textChannels.filter(channel => channel.name === "welcome-and-rules");
    console.log(welcomeChannels);
    if(!welcomeChannels[0]){
        message.channel.send("Can't find welcome channel")
    }else{
        const welcomeChannel = welcomeChannels[0] as sendMethodProp;
        welcomeChannel.send(`@everyone The Marathons is Started!! Type _<PROBLEMS>_ to see the problem,`);
    }
}

export {
    execute
}