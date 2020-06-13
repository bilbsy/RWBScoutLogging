import * as fs from 'fs';

export function getGuild(displayName, __dirname) {
    var guilds = [];
    var guildCode = (displayName.split(']')[0]).replace('[', '');
    
    guilds = JSON.parse(fs.readFileSync(__dirname + '/json/guilds.txt', 'utf8'));

    return guilds.find(x => x.guildCode == guildCode);
}