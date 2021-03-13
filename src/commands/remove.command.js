import messageCodes  from '../utils/messageCodes.js';
import { User } from '../models/user.js';
import { Marathon } from '../models/marathon.js';

export default async (client, message) => {
    const execute = async () => {
        const usersMap = await message.mentions.users;
        if(!usersMap){
            throw new Error('User not fount. Please, type _!remove @User_');
        }
        const users = Array.from(usersMap);
        if(users.length > 1 || users.length <=0){
            throw new Error('Just one member can be deleted each time. Please, type _!remove @User_');
        }
        const { id, username } = users[0][1];
        const userExists = await User.findOne({ userId: id });
        if(!userExists){
            throw new Error("User not found.");
        }
        const userIsDealerOnOpenedMarathons = await Marathon.findOne({ dealer: userExists._id  });
        console.log(userExists);
        console.log(userIsDealerOnOpenedMarathons);
        if(userIsDealerOnOpenedMarathons){
            throw new Error('This user is a Dealer on a opened marathon. Please, finish them to remove');
        }

        await User.remove(userExists);
        return username;
    }
    try{
        const name = await execute();
        await message.channel.send(`${messageCodes.success} - User ${name} deleted!`);
    }catch(err){
        await message.channel.send(`${messageCodes.error} - ${err.message}`);
    }
}
