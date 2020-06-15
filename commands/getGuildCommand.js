import * as fs from 'fs';

export function getGuild(displayName, __dirname) {
    var guilds = [];
    var guildCode = (displayName.split(']')[0]).replace('[', '').split(' ')[0];
    var file = fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8');
    
    if(file != "") {
        guilds = JSON.parse(file);
    }
    
    return guilds.find(x => x.guildCode == guildCode);
}