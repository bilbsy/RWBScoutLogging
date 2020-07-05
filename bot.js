import { scoutLog } from './commands/scoutLogCommand.js';
import { setSpawnTimes } from './commands/setSpawnTimesCommand.js';
import { addGuild } from './commands/addGuildCommand.js';
import { scoutStart } from './commands/scoutStartCommand.js';
import { scoutEnd } from './commands/scoutEndCommand.js';
import { summoner } from './commands/summonerCommand.js';
import { bossKill } from './commands/bossKillCommand.js';
import { help } from './commands/helpCommand.js';
import { addRemovePoints } from './commands/removePointsCommand.js';
import { viewPoints } from './commands/viewPointsCommand.js';
import { test } from './commands/testingshit.js';
import path from 'path';
import * as auth from './config.js';
import * as Discord from 'discord.js';

var client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(auth.default.token);

client.on('message', discordMessage => {
    try {
        var cmd = "";
        var __dirname = path.resolve();
        var isAdmin = discordMessage.member.roles.cache.some(r => r.name == 'Officer' || r.name == 'Admin');
        if (discordMessage.content.substring(0, 1) == '$') {
            if(discordMessage.content.indexOf(' ') >= 0) {
                cmd = discordMessage.content.substr(0, discordMessage.content.indexOf(' '));
            }
            else {
                cmd = discordMessage.content;
            }
            var args = discordMessage.content.substr(discordMessage.content.indexOf(' ')+1).replace(/\]/g, '').split('[');
            var success = [];
            switch(cmd.toLowerCase()) {
                case '$addguild':
                    success = addGuild(args, __dirname);
                break;
                case '$setspawntimes':
                    success = setSpawnTimes(args, __dirname);
                break;
                case '$scoutlog':
                    success = scoutLog(discordMessage, args, __dirname);
                break;
                case '$startscout':
                case '$scoutstart':
                    success = scoutStart(discordMessage, args, __dirname);
                break;
                case '$endscout':
                case '$scoutend':
                    success = scoutEnd(discordMessage, args, __dirname);
                break;
                case '$summoner':
                    success = summoner(discordMessage, args, __dirname);
                break;
                case '$bosskill':
                    success = bossKill(discordMessage, args, __dirname);
                break;
                case '$help':
                    success = help(discordMessage, args, __dirname);
                break;
                case '$test':
                    success = test(discordMessage, args, __dirname);
                break;
                case '$viewpoints':
                    success = viewPoints(discordMessage, args, __dirname);
                break;
                case '$addremovepoints':
                    if(isAdmin) {
                        success = addRemovePoints(discordMessage, args, __dirname);
                    } else {
                        success.push({
                            result: false,
                            errorMessage: 'Sorry you don\'t have access to that command.'
                        });
                    }
                break;
                default:
                    success.push({
                        result: false,
                        errorMessage: 'Sorry that format is incorrect'
                    })
                break;
            }

            if(success.length != 0) {
                for(var i = 1; i <= success.length; i++){
                    discordMessage.channel.send(success[i-1].errorMessage);
                }
            }
        }
    }
    catch(err) {
        discordMessage.channel.send("A serious error occurred. Message Bilbsy as he will need to fix this.");
        console.log(err);
    }
});