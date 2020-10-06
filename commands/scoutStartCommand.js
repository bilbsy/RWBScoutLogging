import { getGuild } from './getGuildCommand.js';
import moment from 'moment-timezone/moment-timezone.js';
import * as fs from 'fs';

export function scoutStart(discordMessage, args, __dirname) {
    var success = [];
    var start = "";
    var date = moment().tz('Australia/Sydney');
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
        var dateCheck = args[2].split(' ');

        if (args[2].includes(':')){

            if(dateCheck.length == 2) {
                start = args[2];
            }
            else {
                start = ('0' + date.date()).slice(-2) + '-' + ('0' + (date.month()+1)).slice(-2) + ' ' + args[2];
            }
        } else {
            success.push({
                result: false,
                errorMessage: 'The time is incorrectly formatted. Please format like HH:mm or DD-MM HH:mm.'
            });

            return success;
        }
    } else {
        if(date.hours() == 24) {
            date.setHours(0);
            date.setDate(date.getDate() + 1)
        }


        start = ('0' + date.date()).slice(-2) + '-' + ('0' + (date.month()+1)).slice(-2) + ' ' + ('0' + (date.hours()+1)).slice(-2) + ':' + ('0' + (date.minutes()+1)).slice(-2);
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

    if (scoutLog.find(x => x.boss == args[1].replace(' ', '') && x.guildCode == guild.guildCode)) {
        success.push({
            result: false,
            errorMessage: 'Your guild already has a scout on this boss, no points will be accumulated. End that scout first.'
        });

        return success;
    }

    scoutLog.push({
        "boss": args[1].replace(' ', ''), 
        "startTime": start, 
        "username": discordMessage.member.displayName,
        "guildCode": guild.guildCode
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

    success.push({
        result: true,
        errorMessage: ''
    });

    return success;
}