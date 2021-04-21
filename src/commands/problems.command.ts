import Discord from 'discord.js';

import { Marathon, MarathonProps } from '../models/marathon';
import { User } from '../models/user';

import { helpObject as addHelp } from './add.command';
import { helpObject as startHelp } from './start.command';

const execute = async (discord: Discord.Client, message: Discord.Message) => {
    const marathons = await Marathon.find({status: 'IN_PROGRESS'}) as Array<MarathonProps>;
    if(marathons.length > 1){
        throw new Error('An error ocurred, have more than two marathons with "IN_PROGRESS" status. Please, contact admin.');
    }
    if(marathons.length <=0){
        throw new Error(`Have no marathons in progress. Please, type _${startHelp.syntax}_ to add a problem (just if you're a dealer)`);
    }
    if (marathons[0].problems.length <=0){
        throw new Error(`Have no problems for this marathon, please, type _${addHelp.syntax}_`);
    }
    
    const dealer = await User.findOne({ _id: marathons[0].dealer });
    if(!(dealer.userId === message.author.id)){
        throw new Error(`Just the dealer of current opened marathon can invoke this command. This thime, the current Dealer is <@${dealer.userId}>`)
    }

    const dealerUser = message.guild?.members.cache.find(member => member.user.id === dealer.userId);
    if(!dealerUser){
        throw new Error('Dealer not find in Server data. Please, Contact Admin');
    }

    const hackerrankLogoUrl = "https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/160_Hackerrank_logo_logos-512.png";

    const problemsField = [] as Array<Discord.EmbedFieldData>;
    marathons[0].problems.map(problem => {
        problemsField.push({
            name: `Problem ${marathons[0].problems.indexOf(problem) + 1} - ${problem.points} point${problem.points > 1 ? 's' : ''}`,
            value: `URL: ${problem.url}`
        });
        problemsField.push({
            name: '\u200B',
            value: '\u200B'
        });
    });

    const embedMessage = new Discord.MessageEmbed()
	.setColor('#51FC51')
	.setTitle('Marathon Problems')
	.setAuthor(`Dealer: ${dealerUser.user.username}`, dealerUser.user.avatarURL() || undefined)
	.setDescription('Here are the marathon problems\n\n\n\n')
	.setThumbnail(hackerrankLogoUrl)
	.addFields(problemsField)
	.setTimestamp()
	.setFooter("Good Lucky and let's code!", hackerrankLogoUrl);

    message.channel.send(embedMessage);

}

const helpObject = {
    name: 'Problems',
    description: "Show all problems of the current marathon (case it's running)",
    syntax: '!problems'
}

export {
    execute,
    helpObject
}