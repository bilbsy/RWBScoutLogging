export function scoutLog(discordMessage, args) {
    var success = [];
    var year = new Date().getFullYear();
    var datetime = args[2].split(' ');
    var date = datetime[0].split('-');
    var firstTime = new Date(date[1] + '-' + date[0] + '-' + year + ' ' + datetime[1]);

    datetime = args[3].split(' ');
    date = datetime[0].split('-');
    var secondTime = new Date(date[1] + '-' + date[0] + '-' + year + ' ' + datetime[1]);
    var timeNow = new Date();

    if (firstTime <= timeNow) {
        if(success.length == 0){
            success.push({
                result: true,
                errorMessage: ''
            })
        }
    } else {
        success.push({
            result: false,
            errorMessage: 'First time is not before time now.'
        });
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
        logPoints(args, discordMessage, firstTime, secondTime);
        success = [{
            result: true,
            errorMessage: 'Sick you added points!'
        }];
    }

    return success;
}

function logPoints(args, discordMessage, firstTime, secondTime) { 
    
}