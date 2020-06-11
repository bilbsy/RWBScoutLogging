import { scoutLog } from './commands/scoutLogCommand.js';
import { setSpawnTimes } from './commands/setSpawnTimesCommand.js';
import { addGuild } from './commands/addGuildCommand.js';
import * as auth from './config.js';
import { Client } from 'discord.js';


var client = new Client;

client.once('ready', () => {
	console.log('Ready!');
});

client.login(auth.default.token);

client.on('message', discordMessage => {
    if (discordMessage.content.substring(0, 1) == '!') {
        var cmd = discordMessage.content.substr(0, discordMessage.content.indexOf(' '));
        var args = discordMessage.content.substr(discordMessage.content.indexOf(' ')+1).replace(/\]/g, '').split('[');
        var success = [];
        switch(cmd) {
            case '!addGuild':
                addGuild(args);
            break;
            case '!setSpawnTimes':
                setSpawnTimes(args);
            break;
            case '!scoutLog':
                success.push(scoutLog(discordMessage, args));
            break;
            default:
                success.push({
                    result: false,
                    errorMessage: 'Sorry that format is incorrect'
                })
            break;
        }

        if(success.length != 0) {
            for(var i = 0; i >= success.length; i++){
                discordMessage.channel.send(success[i].errorMessage);
            }
        }
     }
});