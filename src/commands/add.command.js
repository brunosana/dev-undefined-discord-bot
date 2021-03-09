import messageCodes  from '../utils/messageCodes.js';
import { User } from '../models/user.js';

export default async (client, message) => {
    
    const execute = async () => {
        const name = message.content.split(' ')[1];
        if(!name){
            throw new Error("Name must be required. Please, type _!add <name>_!");
        }
        const userExists = await User.findOne({ name });
        if(userExists){
            throw new Error("This user is already in the database!");
        }
        await User.create({name});
        return name;
    }
    try{
        const name = await execute();
        await message.channel.send(`${messageCodes.success} - The user ${name} now has on team!!`);
    }catch(err){
        await message.channel.send(`${messageCodes.error} - ${err.message}`);
    }
}
