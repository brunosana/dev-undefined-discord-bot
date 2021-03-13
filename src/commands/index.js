import messageCodes  from '../utils/messageCodes.js';
import rankCommand from './rank.command.js';
import addCommand from './add.command.js';
import removeCommand from './remove.command.js';
import helpCommand from './help.command.js';
import createCommand from './create.command.js';
import dealerCommand from './dealer.command.js';
import testCommand from './test.command.js';

export default async (client, message) => {
    const command = message.content.split(' ')[0].substring(1);
    switch (command){
        case "rank": await rankCommand(client, message); break;
        case "add": await addCommand(client, message); break;
        case "remove": await removeCommand(client, message); break;
        case "help": await helpCommand(client, message); break;
        case "create": await createCommand(client, message); break;
        case "dealer": await dealerCommand(client, message); break;
        case "test": await testCommand(client, message); break;
        default: message.channel.send(`${messageCodes.error} - Command **${command}** not found. type _!help_`); break;
    }
}