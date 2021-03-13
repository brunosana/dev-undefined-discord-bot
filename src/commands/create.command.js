import messageCodes  from '../utils/messageCodes.js';
import { Marathon } from '../models/marathon.js';
import { User } from '../models/user.js';

export default async (client, message) => {
    
    const execute = async () => {
        const usersMap = await message.mentions.users;
        if(!usersMap){
            throw new Error('Dealer must be necessary. Please, type _!add @User_');
        }
        const users = Array.from(usersMap);
        if(users.length > 1 || users.length <=0){
            throw new Error('Invalid Dealer data. Please, type _!create @User_');
        }
        const dealer = users[0][1];
        const dealerExists = await User.findOne({userId: dealer.id});
        if(!dealerExists){
            throw new Error('Dealer is not on database. Please, type _!add @User_');
        }
        const marathons = await Marathon.find();
        console.log(marathons);
        marathons.map(m => {
            if(m.status === 'CREATED' || m.status === 'IN_PROGRESS'){
                throw new Error('Already a Marathon created or in progress. Please, finish them before to create another.')
            }
        })
        const marathon =  await Marathon.create({dealer: dealerExists._id});
        return { id: marathon._id, name: dealer.username }
    }
    try{
        const { id, name } = await execute();
        await message.channel.send(`${messageCodes.success} - The Marathon has been created: \nId: ${id} | Dealer: ${name}!`);
    }catch(err){
        await message.channel.send(`${messageCodes.error} - ${err.message}`);
    }
}
