import * as fs from 'fs';

export function addGuild(args, __dirname) {
    var guilds = [];
    var success = [];

    guilds = fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8') == "" ? []
        : JSON.parse(fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8'));

    guilds.push({
        "guildCode": args[1].replace(' ', ''), 
        "guildName": args[2], 
        "points": {
            "kazzak": "",
            "azuregos": "",
            "dragons": ""
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

    return success;
}