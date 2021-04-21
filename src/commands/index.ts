import { RouterProps } from '../Router';
import helpCommand from './help.command';

import { execute as isPrivate } from '../middlewares/isPrivate';
import { execute as haveMarathonManagerRole } from '../middlewares/haveMarathonManagerRole';

import { execute as newExecute } from './new.command';
import { execute as addExecute } from './add.command';
import { execute as rankExecute } from './rank.command';
import { execute as loadExecute } from './load.command';
import { execute as dealerExecute } from './dealer.command';
import { execute as testExecute } from './test.command';
import { execute as delExecute } from './del.command';
import { execute as listExecute } from './list.command';
import { execute as problemsExecute } from './problems.command';
import { execute as startExecute } from './start.command';


const loadCommands = (Router: RouterProps) => {
    Router.use("help", helpCommand);
    Router.use("new", haveMarathonManagerRole, newExecute);
    Router.use("start", haveMarathonManagerRole, startExecute);
    Router.use("add", isPrivate, addExecute);
    Router.use("del", haveMarathonManagerRole, delExecute);
    Router.use("problems", problemsExecute);
    Router.use("list", listExecute);
    Router.use("rank", rankExecute);
    Router.use("start", startExecute);
    Router.use("load", loadExecute);
    Router.use("dealer", dealerExecute);
    Router.use("test", testExecute);
}

export default {
    loadCommands
}