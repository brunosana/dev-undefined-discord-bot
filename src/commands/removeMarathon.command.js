import messageCodes  from '../utils/messageCodes.js';
import { User } from '../models/user.js';
import { Marathon } from '../models/marathon.js';

export default async (client, message) => {
    
    const execute = async () => {
        const params = message.content.split(' ');
        if(params.length > 2 || params.length <=1){
            throw new Error('Invalid sintax. Please, type _!removeMarathon <Marathon_id>_');
        }
        const [,id] = params;
        const marathom = await Marathon.findOne({ _id: id });
        if(!marathom){
            throw new Error('Maraton not found');
        }
        if(marathom.status === 'CREATED' || marathon.status === 'IN_PROGRESS'){
            await marathom.delete();
            return { id: marathom._id };
        }
        throw new Error('Only opened marathons can be deleted (Current Status: CLOSED. Accepted status: ["CREATED", "IN_PROGRESS"]).');
    }
    try{
        const { id } = await execute();
        await message.channel.send(`${messageCodes.success} - The marathon **${id}** has been deleted!`);
    }catch(err){
        await message.channel.send(`${messageCodes.error} - ${err.message}`);
    }
}
