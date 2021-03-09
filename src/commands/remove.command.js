import messageCodes  from '../utils/messageCodes.js';
import { User } from '../models/user.js';

export default async (client, message) => {
    const execute = async () => {
        const name = message.content.split(' ')[1];
        if(!name){
            throw new Error("Name must be required. Please, type _!remove <name>_!");
        }
        const user = await User.findOne({ name });
        if(!user){
            throw new Error("User not found.");
        }
        await User.remove(user);
        return name;
    }
    try{
        const name = await execute();
        await message.channel.send(`${messageCodes.success} - User ${name} deleted!`);
    }catch(err){
        await message.channel.send(`${messageCodes.error} - ${err.message}`);
    }
}
