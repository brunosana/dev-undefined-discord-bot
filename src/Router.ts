import Discord from 'discord.js';
import messageCodes from './utils/messageCodes';

interface UseFunction{
    (command: String, ...callbacks: Function[]): void;
}
interface CheckFunction{
    (command: String, client: Discord.Client, message: Discord.Message): void;
}
export interface RouterProps {
    commands: Array<commandsProps>;
    use: UseFunction;
    check: CheckFunction;
}
interface commandsProps {
    command: String,
    middlewares: Function[]
}

const commands: Array<commandsProps> = [];

const use = function(
    command: String,
    ...callbacks: [Function]
    ){
        commands.push({command, middlewares: [...callbacks]});
    }

const check = async function(command: String, client: Discord.Client, message: Discord.Message): Promise<void>{
    let executed = false;
    for(let i = 0; i < commands.length; i++){
        if(commands[i].command === command){
            try{
                executed = true;
                await execute(i, client, message);
            }catch(err){
                throw new Error(err.message);
            }
        }            
    }
    if(!executed){
        message.channel.send(`${messageCodes.error} - Command not found! Type !help`);
    }
}
const execute = async function(index: Number, client: Discord.Client, message: Discord.Message): Promise<void>{
    const id = parseInt(index.toString());
    for(let i = 0; i < commands[id].middlewares.length; i++){
        try{
            await commands[id].middlewares[i](client, message);
        } catch(err){
            throw new Error(err.message);
        }
    }
}

export default {
    commands,
    use,
    check,
} as RouterProps