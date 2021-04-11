import Discord from 'discord.js';

import messageCodes  from '../utils/messageCodes';
import { User } from '../models/user';
import { Marathon } from '../models/marathon';

import { helpObject as newHelp } from './new.command';

const execute = async (client: Discord.Client, message: Discord.Message) => {
    const marathons = await Marathon.find({status: 'CREATED'});
    if(marathons.length > 1){
        throw new Error('An error ocurred, have more than two marathons with "CREATED" status. Please, contact admin.');
    }
    if(marathons.length <=0){
        throw new Error(`Have no opened marathons. Please, type _${newHelp.syntax}_`);
    }
    const dealer = await User.findOne({ _id: marathons[0].dealer });
    if(!(dealer.userId === message.author.id)){
        throw new Error(`You're not a dealer. This thime, the current Dealer is <@${dealer.userId}>`)
    }
    const params = message.content.split(' ');
    if(params.length > 4 || params.length <=3){
        throw new Error(`Invalid sintax. Please, type _${helpObject.syntax}_`);
    }
    const [,name, url, points] = params;
    marathons[0].problems.map((problem: { url: string; }) => {
        if(problem.url === url) throw new Error('This problem already exists to this marathon. Select other');
    });

    const pointsConverted = parseInt(points, 10);

    marathons[0].problems.push({name, url, points: pointsConverted});
    if(marathons[0].points){
        marathons[0].points += pointsConverted;
    }else{
        marathons[0].points = pointsConverted;
    }
    await marathons[0].save();
    message.channel.send(`${messageCodes.success} - The problem **${name}** added on marathon ${marathons[0]._id}!`);
}

const helpObject = {
    name: 'add',
    description: 'Add a new problem on a active Marathon',
    syntax: '!add <Problem_Name> <Problem_URL> <Points>'
}

export {
    execute,
    helpObject
}