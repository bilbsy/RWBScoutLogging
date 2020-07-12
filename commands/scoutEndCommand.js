import * as fs from 'fs';
import { scoutLog } from './scoutLogCommand.js';

export function scoutEnd(discordMessage, args, __dirname, guildClean) {
    var success = [];
    var scoutLogFile = fs.readFileSync(__dirname + '/json/scoutLog.txt', 'utf8') == "" ? []
    : JSON.parse(fs.readFileSync(__dirname + '/json/scoutLog.txt', 'utf8'));
    var date = new Date();
    var startLogs = []
    
    startLogs.push(guildClean != undefined ? scoutLogFile.find(x => x.username.includes("[" + guildClean.guildCode + "]") && x.boss == args[1].replace(' ', '')) 
    : scoutLogFile.find(x => x.username == discordMessage.member.displayName && x.boss == args[1].replace(' ', '')));

    if (startLogs == undefined) {
        success.push({
            result: false,
            errorMessage: 'You didn\'t start a log, you may want to use the scoutLog command and specify your times instead!.'
        });

        return success;
    }

    args[1] = args[1].replace(' ', '');

    if(args[1].toLowerCase() != "kazzak" && args[1].toLowerCase() != "azuregos" && args[1].toLowerCase() != "dragons"){
        success.push({
            result: false,
            errorMessage: 'The eye of Sauron sees all!! Including that you got the world boss wrong!.'
        });

        return success;
    }

    if(startLogs[0] != undefined){
        for(var i = 0; i < startLogs.length; i++) {
            var startLog = startLogs[i];

            if(args >= 3) {
                var dateCheck = args[2].split(' ');

                if (args[2].includes(':')){
        
                    if(dateCheck.length == 2) {
                        args.push(args[2]);
                    }
                    else {
                        args.push(('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2) + ' ' + args[2]);
                    }
                } else {
                    success.push({
                        result: false,
                        errorMessage: 'The time is incorrectly formatted. Please format like HH:mm or DD-MM HH:mm.'
                    });
        
                    return success;
                }
                args[2] = startLog.startTime;
            }
            else {
                args[2] = startLog.startTime;
                args.push(('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2) + ' ' + date.getHours() + ':' + date.getMinutes());
            }

            var success = scoutLog(discordMessage, args, __dirname, guildClean);

            if(success[0].result == true){
                removeByAttr(scoutLogFile, startLog)
                
                if(scoutLogFile == undefined) {
                    scoutLogFile = [];
                }

                const jsonString = JSON.stringify(scoutLogFile);
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
                    errorMessage: 'And now your watch has ended.'
                });
            }
        }
    }

    return success;
}

var removeByAttr = function(arr, startLog){
    for (var i = 0; i < arr.length; i++){
        if(arr[i].boss == startLog.boss && arr[i].username == startLog.username) {
            arr.splice(i, 1);
        }
    }
    return arr;
}