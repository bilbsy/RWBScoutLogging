import * as Discord from 'discord.js';
import * as fs from 'fs';
import { scoutEnd } from './scoutEndCommand.js';

export function bossKill(discordMessage, args, __dirname) {
    var guilds = [];
    var success = [];
    var file = fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8');
    
    if(file != "") {
        guilds = JSON.parse(file);
    }

    var rollOutput = [];
    var points = 0;
    var previousPoints = 0;
    
    if(isNaN(args[2])) {
        success.push({
            result: false,
            errorMessage: 'That raid number be not a number! Please make sure to specify the number of people in the raid after the boss.'
        });

        return success;
    }

    points += parseInt(args[2], 10);
    rollOutput.push({
        name: 'Raid Group Roll',
        value: '1-' + args[2]
    });
    
    previousPoints = points;

    guilds.forEach(guild => {
        var pointsZero = false;
        scoutEnd(discordMessage, args, __dirname, guild);

        guild = guilds.find(x => x.guildCode == guild.guildCode)

        switch(args[1].toLowerCase().replace(' ', '')) {
            case 'kazzak':
                if(guild.kazzak.points != "" && guild.kazzak.points != 0 && guild.kazzak.points != '0'){
                    points += Math.floor(guild.kazzak.points);
                }
                else {
                    pointsZero = true;
                }
                break;
            case 'azuregos':
                if(guild.azuregos.points != "" && guild.azuregos.points != 0 && guild.azuregos.points != '0'){
                    points += Math.floor(guild.azuregos.points);
                }
                else {
                    pointsZero = true;
                }
                break;
            case 'dragons':
            case 'ysondre':
            case 'taerar':
            case 'lethon':
            case 'emeriss':
                if(guild.dragons.points != "" && guild.dragons.points != 0 && guild.dragons.points != '0'){
                    points += Math.floor(guild.dragons.points, 10);
                }
                else {
                    pointsZero = true;
                }
                break;
            default:
                success.push({
                    result: false,
                    errorMessage: 'After all this time? You get the boss name wrong... Please check the name for example Green dragons are just \'dragons\'.'
                });
                break;
        }

        previousPoints += 1;

        if(!pointsZero) {
            rollOutput.push({
                name: ':game_die: ' + guild.guildName,
                value: '```' +previousPoints + '-' + points + '```'
            });
        }

        previousPoints = points;
    });

    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Boss Kill Loot rolls 1-' + points)
	.addFields(rollOutput);
    
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
    
    success.push({
        result: true,
        errorMessage: exampleEmbed
    });

    return success;
}