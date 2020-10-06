import { getGuild } from './getGuildCommand.js';
import * as fs from 'fs';

export function scoutLog(discordMessage, args, __dirname, guildClean) {
    var success = [];
    var year = new Date().getFullYear();
    var datetime = args[2].split(' ');
    var date = datetime[0].split('-');
    var guild = guildClean != undefined ? guildClean : getGuild(discordMessage.member.displayName, __dirname);

    var hour = datetime[1].split(':');

    if(hour[0] == 24) {
        datetime[1] = "00:" + hour[1];
        date[1] + 1;
    }

    var firstTime = new Date(date[1] + '-' + date[0] + '-' + year + ' ' + datetime[1]);

    if(guild == undefined) {
        success.push({
            result: false,
            errorMessage: 'Your guild was not found. Please add your guild in your nickname. Eg. [GG] Bilbsy.'
        });
    }

    datetime = args[3].split(' ');
    date = datetime[0].split('-');
    hour = datetime[1].split(':');

    if(hour[0] == 24) {
        datetime[1] = "00:" + hour[1];
        date[1] + 1;
    }

    var secondTime = new Date(date[1] + '-' + date[0] + '-' + year + ' ' + datetime[1]);

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
                        
            discordMessage.delete();
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

    points = getPoints(firstTime, secondTime);
    
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

function getPoints(firstTime, secondTime) {
    var ptsOffPeak = 1;
    var ptsOnPeak = 0.5;
    var offPeakStart = 1;
    var offPeakEnd = 8;
    var points = 0;
            
    if (firstTime.getDate() == secondTime.getDate()) {
        if (firstTime.getHours() >= offPeakEnd && secondTime.getHours() >= offPeakEnd) 
        {
            // calculates points for scouting after offPeakEndam
            points += (secondTime.getHours() - firstTime.getHours()) * ptsOnPeak;
        }
        else if (firstTime.getHours() < offPeakStart) 
        {
            // calculates pts for before offPeakStart am	
            points += (offPeakStart - firstTime.getHours()) * ptsOnPeak;
            
            if (secondTime.getHours() > offPeakStart && secondTime.getHours() <= offPeakEnd) 
            {
                // calculates pts for finishing after offPeakStartam and before offPeakEndam
                points += (secondTime.getHours() - offPeakStart) * ptsOffPeak;
            } 
            else if (secondTime.getHours() > offPeakEnd) 
            {
                // calculates pts for finishing after offPeakEndam
                points += (secondTime.getHours() - offPeakEnd) * ptsOnPeak;
                points += (offPeakEnd - offPeakStart) * ptsOffPeak;
            } 
            else 
            {
                // assumes you finished scouting before offPeakStartam and thus applies a 
                // negative value
                points += (secondTime.getHours() - offPeakStart) * ptsOnPeak;
            }
        } 
        else if (firstTime.getHours() > offPeakStart) 
        {
            // calculates pts if starting after offPeakStartam and before offPeakEndam
            if (secondTime.getHours() <= offPeakEnd) 
            {
                // calculates pts for finishing after offPeakStartam and before offPeakEndam
                points += (secondTime.getHours() - firstTime.getHours()) * ptsOffPeak;
            } 
            else if (secondTime.getHours() > offPeakEnd) 
            {
                // calculates pts for finishing after offPeakEndam
                points += (secondTime.getHours() - offPeakEnd) * ptsOnPeak;
                points += (offPeakEnd - firstTime.getHours()) * ptsOffPeak;
            }
        }
    } 
    else
    {
        if (firstTime.getHours() < offPeakStart) 
        {
            points += (offPeakStart - firstTime.getHours()) * ptsOnPeak;
            points += (offPeakEnd - offPeakStart) * ptsOffPeak;
            points += (24 - offPeakEnd) * ptsOnPeak;
        }
        else if (firstTime.getHours() < offPeakEnd) 
        {
            points += (offPeakEnd - offPeakStart) * ptsOffPeak;
            points += (24 - offPeakEnd) * ptsOnPeak;
        } else {
            points += (24 - firstTime.getHours()) * ptsOnPeak;
        }

        if (secondTime.getHours() <= offPeakStart) 
        {
            points += secondTime.getHours() * ptsOnPeak;
        } 
        else if (secondTime.getHours() <= offPeakEnd) 
        {
            points += offPeakStart * ptsOnPeak;
            points += (secondTime.getHours() - offPeakStart) * ptsOffPeak;
        } 
        else 
        {
            points += offPeakStart * ptsOnPeak;
            points += (offPeakEnd - offPeakStart) * ptsOffPeak;
            points += (secondTime.getHours() - offPeakEnd) * ptsOnPeak;
        }
    }

    return points;
}