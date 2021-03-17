import messageCodes  from '../utils/messageCodes.js';
import { User } from '../models/user.js';
import { Marathon } from '../models/marathon.js';

export default async (client, message) => {
    
    const execute = async () => {
        if (message.channel.type !== 'dm'){
            message.delete({timeout: 10});
            throw new Error('This command is avaliable only in DM chat. Type _!dealer_');
        }
        const marathons = await Marathon.find({status: 'CREATED'});
        if(marathons.length > 1){
            throw new Error('An error ocurred, have more than two marathons with "CREATED" status. Please, contact admin.');
        }
        if(marathons.length <=0){
            throw new Error('Have no opened marathons. Please, type _!create @User_');
        }
        const dealer = await User.findOne({ _id: marathons[0].dealer });
        if(!(dealer.userId === message.author.id)){
            throw new Error(`You're not a dealer. This thime, the current Dealer is <@${dealer.userId}>`)
        }
        const params = message.content.split(' ');
        if(params.length > 3 || params.length <=2){
            throw new Error('Invalid sintax. Please, type _!addProblem <Problem_Name> <Problem_URL>_');
        }
        const [,name, url] = params;

        marathons[0].problems.map(problem => {
            if(problem.url === url) throw new Error('This problem already exists to this marathon. Select other');
        });

        marathons[0].problems.push({name, url});
        await marathons[0].save();
        return {id: marathons[0]._id, name};
    }
    try{
        const { id, name } = await execute();
        await message.channel.send(`${messageCodes.success} - The problem **${name}** added on marathon ${id}!`);
    }catch(err){
        await message.channel.send(`${messageCodes.error} - ${err.message}`);
    }
}
