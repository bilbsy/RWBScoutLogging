import * as fs from 'fs';

export function getGuild(displayName, __dirname, guildCode) {
    var guilds = [];
    var guildCode = guildCode == undefined ? (displayName.split(']')[0]).replace('[', '').split(' ')[0] : guildCode;
    var file = fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8');
    
    if(file != "") {
        guilds = JSON.parse(file);
    }
    
    return guilds.find(x => x.guildCode == guildCode);
}