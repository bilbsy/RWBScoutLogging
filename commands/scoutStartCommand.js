import { getGuild } from './getGuildCommand.js';
import * as fs from 'fs';

export function scoutStart(discordMessage, args, __dirname) {
    var success = [];
    var start = "";
    var date = new Date();
    args[1] = args[1].replace(' ', '');

    var guild = getGuild(discordMessage.member.displayName, __dirname);

    if(guild == undefined) {
        success.push({
            result: false,
            errorMessage: 'Your guild was not found. Please add your guild in your nickname. Eg. [GG] Bilbsy.'
        });

        return success;
    }

    if(args.length >= 3) {
        start = args[2];
    } else {
        start = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2) + ' ' + date.getHours() + ':' + date.getMinutes();
    }

    if(args[1].toLowerCase() != "kazzak" && args[1].toLowerCase() != "azuregos" && args[1].toLowerCase() != "dragons"){
        success.push({
            result: false,
            errorMessage: 'The eye of Sauron sees all!! Including that you got the world boss wrong!.'
        });

        return success;
    }

    var scoutLog = fs.readFileSync(__dirname + '/json/scoutLog.txt', 'utf8') == "" ? []
    : JSON.parse(fs.readFileSync(__dirname + '/json/scoutLog.txt', 'utf8'));

    if (scoutLog.find(x => x.boss == args[1].replace(' ', '') && x.username == discordMessage.member.displayName)) {
        success.push({
            result: false,
            errorMessage: 'You already have a scout for this boss going, yah silly.'
        });

        return success;
    }

    scoutLog.push({
        "boss": args[1].replace(' ', ''), 
        "startTime": start, 
        "username": discordMessage.member.displayName
    });

    const jsonString = JSON.stringify(scoutLog);
    fs.writeFile('./json/scoutLog.txt', jsonString, err => {
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

    if (args[1].toLowerCase().replace(' ', '') == "kazzak"){
        success.push({
            result: true,
            errorMessage: 'YOU ARE NOT PREPARED!!... You need a summoner too!. (Scout kazzak start logged)'
        });
    }
    else if (args[1].toLowerCase().replace(' ', '') == "dragons") {
        success.push({
            result: true,
            errorMessage: 'What\'s life without a few dragons?. (Scout dragons start logged)'
        });
    } else {
        success.push({
            result: true,
            errorMessage: 'It simply isn\'t an adventure worth telling if there aren\'t any dragons. (Scout Azuregos start logged)'
        });
    }


    return success;
}