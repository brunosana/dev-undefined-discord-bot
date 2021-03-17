import messageCodes  from '../utils/messageCodes.js';

export default async (client, message) => {

    //await message.author.send("Ohhh this is a private message");  
    console.log(message.channel.type);
}