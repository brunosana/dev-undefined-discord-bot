import Discord from 'discord.js';
import messageCodes from '../utils/messageCodes';
import { Marathon, MarathonProps } from '../models/marathon';

interface fieldProps {
    name: string;
    value: string;
    inline: boolean;
}

const execute = async (discord: Discord.Client, message: Discord.Message) =>{

    const marathons = await Marathon.find() as Array<MarathonProps>;
    if(marathons.length >0){
        const fields: Array<fieldProps> = [];
        marathons.map(marathon => {
            let value = `\n\nMembers: ${marathon.members.length} | Points: ${marathon.points || 0}`;
            let problems ="\n\n\nProblems:";
            if(marathon.status != 'CREATED'){
                marathon.problems.forEach(problem => {
                    let problemValue = `\nProblem: ${marathon.problems.indexOf(problem)} | Name: ${problem.name} | Points: ${problem.points}\nUrl: ${problem.url}`;
                    problems += problemValue;
                });
            }else{
                problems = "This marathon hasn't started yet, the problemas aren't visible."
            }
            let date = `${marathon.data.getDay()}/${marathon.data.getMonth()}/${marathon.data.getFullYear()}`
            fields.push({
                name: `Marathon ${fields.length+1}. ID: ${marathon._id} | Date: ${date}`,
                value: `${value}\n${problems}`,
                inline: false,
            })
        });
        message.channel.send({
            embed: {
                color: 0,
                description: `${messageCodes.success} - Hey <@${message.author.id}>, Here are the Undefined Marathons:`,
                fields
            }
        });
    }else{
        message.channel.send(`${messageCodes.success} - Have no marathons on dabatase.`);
    }
}

const helpObject = {
    name: 'list',
    description: 'List All Marathons',
    syntax: '!list'
}

export {
    execute,
    helpObject    
}