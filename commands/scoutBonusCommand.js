import * as fs from 'fs';

export function scoutBonus(discordMessage, args, __dirname) {
    var guilds = [];
    var guildCode = (discordMessage.member.displayName.split(']')[0]).replace('[', '').split(' ')[0];
    var file = fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8');
    var success = [];
    
    if(file != "") {
        guilds = JSON.parse(file);
    }
    
    var guild = guilds.find(x => x.guildCode == guildCode);

    switch(args[1].toLowerCase()) {
        case 'kazzak':
            guild.kazzak.points += 4;
            break;
        case 'azuregos':
            guild.azuregos.points += 4;
            break;
        case 'dragons':
            guild.dragons.points += 4;
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
        errorMessage: 'Scouting bonus added to: ' + guild.guildName
    });

    return success;
}