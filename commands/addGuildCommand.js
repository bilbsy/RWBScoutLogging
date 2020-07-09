import * as fs from 'fs';

export function addGuild(args, __dirname) {
    var guilds = [];
    var success = [];
    var guildCode = args[1].replace(' ', '');

    guilds = fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8') == "" ? []
        : JSON.parse(fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8'));

    var guildExists = guilds.find(g => g.guildCode == guildCode)

    if (guildExists != undefined) {
        success.push({
            result: true,
            errorMessage: 'Guild Code already exists.'
        });
    } else {
        guilds.push({
            "guildCode": guildCode, 
            "guildName": args[2],
            "kazzak": {
                "points": 0,
                "scoutingBonus": false,
                "summoningBonus": false
            },
            "azuregos": {
                "points": 0,
                "scoutingBonus": false,
                "summoningBonus": false
            },
            "dragons": {
                "points": 0,
                "scoutingBonus": false,
                "summoningBonus": false
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
        })

        success.push({
            result: true,
            errorMessage: 'Guild added.'
        });
    }

    return success;
}