import Discord from 'discord.js';
import messageCodes  from '../utils/messageCodes';

import { helpObject as addHelp } from './add.command';
import { helpObject as newHelp } from './new.command';
import { helpObject as loadHelp } from './load.command';
import { helpObject as dealerHelp } from './dealer.command';
import { helpObject as delHelp } from './del.command';

export default async (client: Discord.Client, message: Discord.Message) => {

    const commands = [
        loadHelp,
        newHelp,
        delHelp,
        addHelp,
        dealerHelp,
        {
            name: "help",
            description: "Show the current rank of the group",
            syntax: "!help"
        },
    ]

    const fields = [] as Array<Discord.EmbedField>;
    commands.map(command => {
        fields.push({
            name: `!${command.name}`,
            value: `_${command.description}_\n**Syntax:** ${command.syntax}\n\n\n`,
            inline: false,
        });
    })

    await message.channel.send({
        embed: {
            color: 0,
            description: `${messageCodes.success} - This is the help area`,
            fields
        }
    })
}