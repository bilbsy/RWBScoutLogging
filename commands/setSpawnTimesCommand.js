import * as fs from 'fs';

export function setSpawnTimes(args, __dirname) {
    var spawnTimes = [];
    var success = [];
    var action = "";
    var file = fs.readFileSync(__dirname + '/json/spawnTimes.txt', 'utf8');

    if(file != "") {
        spawnTimes = JSON.parse(fs.readFileSync(__dirname + '/json/spawnTimes.txt', 'utf8'));
    }
    
    if(args[1] == "ALL") {
        spawnTimes.forEach(x => {
            x.bossTime = args[2];
        });
        action = 'updated';
    }
    else if(spawnTimes.find(x => x.bossName == args[1]) != undefined && spawnTimes.find(x => x.bossName == args[1]).length != 0) {
        spawnTimes.find(x => x.bossName == args[1]).bossTime = args[2];
        action = 'updated';
    }
    else {
        spawnTimes.push({"bossName": args[1], "bossTime": args[2]})
        action = 'added';
    }

    const jsonString = JSON.stringify(spawnTimes)
    fs.writeFileSync('./json/spawnTimes.txt', jsonString, err => {
        if (err) {
            console.log('Error writing file', err);
            success.push({
                result: false,
                errorMessage: 'Something went wrong uploading the file.'
            });
        } else {
            console.log('Looks good!', err);
        }
    });

    success.push({
        result: true,
        errorMessage: 'Cool ' + action +', guess we\'re waiting till ' + args[2] + ' for ' + args[1]
    });

    return success;
}