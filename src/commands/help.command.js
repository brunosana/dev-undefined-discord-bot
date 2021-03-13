import messageCodes  from '../utils/messageCodes.js';

export default async (client, message) => {

    const commands = [
        {
            name: "rank",
            description: "Show the current rank of the group",
            syntax: "!rank"
        },
        {
            name: "create",
            description: "Create a new marathon with a Dealer.",
            syntax: "!create @User"
        },
        {
            name: "add",
            description: "Add a memeber on group",
            syntax: "!add @User"
        },
        {
            name: "remove",
            description: "Remove a member of group",
            syntax: "!remove @User"
        },
        {
            name: "help",
            description: "Show the current rank of the group",
            syntax: "!help"
        },
    ]

    const fields = [];
    commands.map(command => {
        fields.push({
            name: `!${command.name}`,
            value: `_${command.description}_\n\n${command.syntax}`,
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