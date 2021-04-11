import Discord from 'discord.js';
import messageCodes from '../utils/messageCodes';
import { User, UserProps } from '../models/user';

const execute = async (discord: Discord.Client, message: Discord.Message) => {
    if(!message.guild){
        throw new Error('Error on get guild, please, contact Admin');
    }
    const guildMembers = await message.guild.members.fetch();
    const allMembers = guildMembers.array().filter(member => !member.user.bot);
    const members = await User.find() as Array<UserProps>;
    const addedMembers = allMembers.filter(member => members.some(user => user.userId === member.user.id ));
    const membersToSave = allMembers.filter(member => !members.some(user => user.userId === member.user.id ));
    if(membersToSave.length <= 0){
        message.channel.send(`${messageCodes.success} - All members are been added!`)
    }else{
        membersToSave.map( async (member) => {
            let newUser = await User.create({userId: member.user.id, name: member.user.username});
            if(!newUser){
                let addedMembers = membersToSave.slice( 0 , membersToSave.indexOf(member)-1);
                let missingToSaveMembers = membersToSave.slice(membersToSave.indexOf(member), membersToSave.length);
                throw new Error(`Error on add <@${member.user.id}> on database. \nThe following members are added: ${addedMembers.join(', ')}\nMembers to save: ${missingToSaveMembers.join(', ')}}`);
            }
        });
    
        const allAddedMembers = addedMembers.concat(membersToSave);
    
        message.channel.send(`${messageCodes.success} - The following members are been added: ${membersToSave.join(', ')}\nMembers on database: ${allAddedMembers.join(', ')}`);
    }

}

const helpObject = {
    name: 'load',
    description: "Load all members that aren't added on Ranking System",
    syntax: '!load'
}
export {
    execute,
    helpObject
}