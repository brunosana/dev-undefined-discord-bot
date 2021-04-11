import { RouterProps } from '../Router';
import helpCommand from './help.command';

import { execute as isPrivate } from '../middlewares/isPrivate';

import { execute as newExecute } from './new.command';
import { execute as addExecute } from './add.command';
import { execute as rankExecute } from './rank.command';
import { execute as loadExecute } from './load.command';
import { execute as dealerExecute } from './dealer.command';
import { execute as testExecute } from './test.command';
import { execute as delExecute } from './del.command';
import { execute as listExecute } from './list.command';

const loadCommands = (Router: RouterProps) => {
    Router.use("help", helpCommand);
    Router.use("new", newExecute);
    Router.use("del", delExecute);
    Router.use("rank", rankExecute);
    Router.use("load", loadExecute);
    Router.use("list", listExecute);
    Router.use("dealer", dealerExecute);
    Router.use("test", testExecute);
    Router.use("add", isPrivate, addExecute);
}

export default {
    loadCommands
}