import messageCodes  from '../utils/messageCodes.js';
import { Marathon } from '../models/marathon.js';
import { User } from '../models/user.js';

export default async (client, message) => {
    
    const execute = async () => {
        const marathons = await Marathon.find({status: 'CREATED'});
        if(marathons.length > 1){
            throw new Error('An error ocurred, have more than two marathons with "CREATED" status. Please, contact admin.');
        }
        if(marathons.length <=0){
            throw new Error('Have no opened marathons. Please, type _!create @User_');
        }
        console.log(marathons[0]);
        const dealer = await User.findOne({ _id: marathons[0].dealer });
        console.log(dealer);
        if(!(dealer.userId === message.author.id)){
            throw new Error(`Just the dealer of current opened marathon can invoke this command. This thime, the current Dealer is <@${dealer.userId}>`)
        }
    }
    try{
        await execute();
        message.author.send(`${messageCodes.success} - Hello Dealer xD! You can add problems typing **in my private chat** the command !addProblem <problem_url>`);
    }catch(err){
        message.channel.send(`${messageCodes.error} - ${err.message}`);
    }
}
