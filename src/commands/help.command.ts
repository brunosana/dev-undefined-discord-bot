import Discord from 'discord.js';
import messageCodes  from '../utils/messageCodes';

import { helpObject as newHelp } from './new.command';
import { helpObject as addHelp } from './add.command';
import { helpObject as rankHelp } from './rank.command';
import { helpObject as loadHelp } from './load.command';
import { helpObject as dealerHelp } from './dealer.command';
import { helpObject as delHelp } from './del.command';
import { helpObject as listHelp } from './list.command';
import { helpObject as problemsHelp } from './problems.command';
import { helpObject as startHelp } from './start.command';

export default async (client: Discord.Client, message: Discord.Message) => {

    const commands = [
        loadHelp,
        newHelp,
        delHelp,
        addHelp,
        listHelp,
        dealerHelp,
        rankHelp,
        problemsHelp,
        startHelp,
        {
            name: "help",
            description: "Show all commands",
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