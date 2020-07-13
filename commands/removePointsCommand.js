import * as fs from 'fs';
import { getGuild } from './getGuildCommand.js';

export function addRemovePoints(discordMessage, args, __dirname) {
    var success = [];
    var guildCode = args[1].replace(' ', '');
    var bossName = args[2].replace(' ', '');
    var pointsRemoval = parseFloat(args[3].replace(' ', ''), 10);
    var guilds = JSON.parse(fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8'));

    if(bossName == undefined || "") {
        success.push({
            result: false,
            errorMessage: 'Boss was not pass through.'
        });
    }

    if(guildCode == undefined || "") {
        success.push({
            result: false,
            errorMessage: 'Boss was not pass through.'
        });
    }

    switch(bossName.toLowerCase()) {
        case 'kazzak':
        case 'kazzak ':
            if(guilds.find(x => x.guildCode == guildCode).kazzak.points == "") {
                guilds.find(x => x.guildCode == guildCode).kazzak.points = pointsRemoval;
            } else {
                var int = parseFloat(guilds.find(x => x.guildCode == guildCode).kazzak.points, 10);
                guilds.find(x => x.guildCode == guildCode).kazzak.points = int + pointsRemoval;
            }
            break;
        case 'azuregos':
        case 'azuregos ':
            if(guilds.find(x => x.guildCode == guildCode).azuregos.points == "") {
                guilds.find(x => x.guildCode == guildCode).azuregos.points = pointsRemoval;
            } else {
                var int = parseFloat(guilds.find(x => x.guildCode == guildCode).azuregos.points, 10);
                guilds.find(x => x.guildCode == guildCode).azuregos.points = int + pointsRemoval;
            }
            break;
        case 'dragons':
        case 'dragons ':
            if(guilds.find(x => x.guildCode == guildCode).dragons.points == "") {
                guilds.find(x => x.guildCode == guildCode).dragons.points = pointsRemoval;
            } else {
                var int = parseFloat(guilds.find(x => x.guildCode == guildCode).dragons.points, 10);
                guilds.find(x => x.guildCode == guildCode).dragons.points = int  + pointsRemoval;
            }
            break;
        default:
            success.push({
                result: false,
                errorMessage: 'Boss name is incorrect. Or you have input values in incorrect order (guildCode then bossName).'
            });
            break;
    }

    const jsonString = JSON.stringify(guilds);
    fs.writeFile('./json/guilds.txt', jsonString, err => {
        if (err) {
            console.log('Error writing file', err);
            success.push({
                result: false,
                errorMessage: 'Something went wrong uploading the file.'
            });
        } else {
            console.log('Successfully wrote file')
        }
    });

    if (success.length == 0){
        success.push({
            result: true,
            errorMessage: 'Points have been added or removed. (' + pointsRemoval + ')'
        });
    }

    return success;
}