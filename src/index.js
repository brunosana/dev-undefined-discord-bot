const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const client = new Discord.Client();
//const config = require('./utils/config');
client.login(process.env.token);

client.on('ready', () => console.log('Bot started...'))