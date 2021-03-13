import messageCodes  from '../utils/messageCodes.js';
import { User } from '../models/user.js';

export default async (client, message) => {
    
    const execute = async () => {
        const usersMap = await message.mentions.users;
        if(!usersMap){
            throw new Error('User not fount. Please, type _!add @User_');
        }
        const users = Array.from(usersMap);
        if(users.length > 1 || users.length <=0){
            throw new Error('Just one member can be added each time. Please, type _!add @User_');
        }
        console.log(users[0][1]);
        const { id, username } = users[0][1];
        const userExists = await User.findOne({ id });
        if(userExists){
            throw new Error("This user is already in the database!");
        }
        const response = await User.create({userId: id, name: username});
        return username;
    }
    try{
        const name = await execute();
        await message.channel.send(`${messageCodes.success} - The user ${name} now has on team!!`);
    }catch(err){
        await message.channel.send(`${messageCodes.error} - ${err.message}`);
    }
}
