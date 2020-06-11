import * as fs from 'fs';

export function setSpawnTimes() {
    var spawnTimes = [];
    var success = []

    spawnTimes = JSON.parse(fs.readFileSync(__dirname + '/json/spawnTimes.txt', 'utf8'));

    spawnTimes.push({"bossName": args[1], "bossTime": args[2]})

    const jsonString = JSON.stringify(guilds)
    fs.writeFile('./json/spawnTimes.txt', jsonString, err => {
        if (err) {
            console.log('Error writing file', err);
            success.push({
                result: false,
                errorMessage: 'Something went wrong uploading the file.'
            });
        } else {
            success.push({
                result: true,
                errorMessage: 'Cool guess we\'re waiting till ' + args[2] + ' for ' + args[1]
            });
        }
    })
}