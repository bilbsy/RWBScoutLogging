import * as Discord from 'discord.js';
import * as fs from 'fs';

export function resetBossPoints(discordMessage, args, __dirname) {
    var guilds = [];
    var success = [];
    var file = fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8');

    if(file != "") {
        guilds = JSON.parse(file);
    }

    guilds.forEach(guild => {
        switch(args[1].toLowerCase().replace(' ', '')) {
            case 'kazzak':
                guild.kazzak.points = 0;
                guild.kazzak.summoningBonus = false;
                guild.kazzak.scoutingBonus = false;
                break;
            case 'azuregos':
                guild.azuregos.points = 0;
                guild.azuregos.summoningBonus = false;
                guild.azuregos.scoutingBonus = false;
                break;
            case 'dragons':
            case 'ysondre':
            case 'taerar':
            case 'lethon':
            case 'emeriss':
                guild.dragons.points = 0;
                guild.dragons.summoningBonus = false;
                guild.dragons.scoutingBonus = false;
                break;
            case 'all':
                guild.dragons.points = 0;
                guild.azuregos.points = 0;
                guild.kazzak.points = 0;
            break;
            default:
                success.push({
                    result: false,
                    errorMessage: 'After all this time? You get the boss name wrong... Please check the name for example Green dragons are just \'dragons\'.'
                });
                break;
        }
    });

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
        errorMessage: "Points reset successfully."
    });

    return success;
}