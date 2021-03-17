import messageCodes  from '../utils/messageCodes.js';

export default async (client, message) => {

    const commands = [
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
            name: "remove marathon",
            description: "Remove a marathon (OBS: A Finished marathon can't be removed).",
            syntax: "!removeMarathon <marathon_id>"
        },
        {
            name: "add problem",
            description: "Insert a problem on a marathon (Only in private channel).",
            syntax: "!addProblem <problem_name_without_spaces> <problem_url>"
        },
        {
            name: "remove problem",
            description: "Insert a problem on a marathon (Only in private channel).",
            syntax: "!addProblem <problem_name_without_spaces> <problem_url>"
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