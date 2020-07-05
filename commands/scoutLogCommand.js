import { getGuild } from './getGuildCommand.js';
import * as fs from 'fs';

export function scoutLog(discordMessage, args, __dirname, guildClean) {
    var success = [];
    var year = new Date().getFullYear();
    var datetime = args[2].split(' ');
    var date = datetime[0].split('-');
    var firstTime = new Date(date[1] + '-' + date[0] + '-' + year + ' ' + datetime[1]);
    var guild = guildClean != undefined ? guildClean : getGuild(discordMessage.member.displayName, __dirname);

    if(guild == undefined) {
        success.push({
            result: false,
            errorMessage: 'Your guild was not found. Please add your guild in your nickname. Eg. [GG] Bilbsy.'
        });
    }

    datetime = args[3].split(' ');
    date = datetime[0].split('-');
    var secondTime = new Date(date[1] + '-' + date[0] + '-' + year + ' ' + datetime[1]);

    if(success.length == 0){
        success.push({
            result: true,
            errorMessage: ''
        })
    }

    if (firstTime <= secondTime) {
        if(success.length == 0){
            success.push({
                result: true,
                errorMessage: ''
            })
        }
    } else {
        success.push({
            result: false,
            errorMessage: 'Second time is not after First time.'
        });
    }

    if(success[0].result == true){
        success = logPoints(args, discordMessage, guild, firstTime, secondTime, __dirname);
        if(success[0].result == true){
            success = [{
                result: true,
                errorMessage: 'Sick ' + discordMessage.member.displayName + ' added ' + success[0].errorMessage +' points to ' + guild.guildName + '!'
            }];
        }
    }

    return success;
}

function logPoints(args, discordMessage, guild, firstTime, secondTime, __dirname) {
    var firstEightAmToday = new Date(firstTime.getFullYear(), firstTime.getMonth(), firstTime.getDate(), 8, 0, 0);
    var secondEightAmToday = new Date(secondTime.getFullYear(), secondTime.getMonth(), secondTime.getDate(), 8, 0, 0);
    var points = 0.0;
    var success = [];

    if(firstTime.getMinutes() < 30 || firstTime.getMinutes() == 0) {
        firstTime = new Date(firstTime.getFullYear(), firstTime.getMonth(), firstTime.getDate(), firstTime.getHours(), 0, 0);
    }
    else {
        firstTime = new Date(firstTime.getFullYear(), firstTime.getMonth(), firstTime.getDate(), firstTime.getHours() + 1, 0, 0);
    }

    if(secondTime.getMinutes() < 30 || secondTime.getMinutes() == 0) {
        secondTime = new Date(secondTime.getFullYear(), secondTime.getMonth(), secondTime.getDate(), secondTime.getHours(), 0, 0);
    }
    else {
        secondTime = new Date(secondTime.getFullYear(), secondTime.getMonth(), secondTime.getDate(), secondTime.getHours() + 1, 0, 0);
    }

    var firstHour = firstTime.getHours();
    var secondHour = secondTime.getHours();

    //0.5 points are assigned per hour scouted in peak times (8am - 1am)
    //1 point is assigned per hour scouted in off peak times (1am - 8am)
    //first time is between 1 and 8. And if secondtime is anytime for rest of day.
    if(firstTime < firstEightAmToday) {
        if(secondTime <= firstEightAmToday) {
            if(firstHour == 0){
                points -= 0.5;
            }
            //1am - 8am firstTime & secondTime
            points += secondHour - firstHour;
        } else {
            //1am - 8am firstTime
            //8am - 1am (next day) secondTime
            if(secondHour <= 1)
            {
                points += 0.5;
            }

            points += (firstEightAmToday.getHours() - firstHour) + ((24 - secondHour - firstEightAmToday.getHours()) /2);
        }
    }
    else {
        if(firstTime.getDate() == secondTime.getDate()) {
            //8am - 12am firstTime & secondTime
            points += (secondHour - firstHour)/2;
        } else {
            if(secondTime < secondEightAmToday){
                points += (24 - firstHour) + (secondHour / 0.5);
            } else {
                points += (24 - firstHour + 7.5) + ((8 - secondHour) /2);
            }
        }
    }
    
    var guilds = JSON.parse(fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8'));

    switch(args[1].toLowerCase()) {
        case 'kazzak':
        case 'kazzak ':
            if(guilds.find(x => x.guildCode == guild.guildCode).kazzak.points == "") {
                guilds.find(x => x.guildCode == guild.guildCode).kazzak.points = points;
            } else {
                var int = parseFloat(guilds.find(x => x.guildCode == guild.guildCode).kazzak.points, 10);
                guilds.find(x => x.guildCode == guild.guildCode).kazzak.points = int + points;
            }
            break;
        case 'azuregos':
        case 'azuregos ':
            if(guilds.find(x => x.guildCode == guild.guildCode).azuregos.points == "") {
                guilds.find(x => x.guildCode == guild.guildCode).azuregos.points = points;
            } else {
                var int = parseFloat(guilds.find(x => x.guildCode == guild.guildCode).azuregos.points, 10);
                guilds.find(x => x.guildCode == guild.guildCode).azuregos.points = int + points;
            }
            break;
        case 'dragons':
        case 'dragons ':
            if(guilds.find(x => x.guildCode == guild.guildCode).dragons.points == "") {
                guilds.find(x => x.guildCode == guild.guildCode).dragons.points = points;
            } else {
                var int = parseFloat(guilds.find(x => x.guildCode == guild.guildCode).dragons.points, 10);
                guilds.find(x => x.guildCode == guild.guildCode).dragons.points = int + points;
            }
            break;
        default:
            success.push({
                result: false,
                errorMessage: 'After all this time? You get the boss name wrong... Please check the name for example Green dragons are just \'dragons\'.'
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
    })

    success.push({
        result: true,
        errorMessage: points
    });

    return success;
}