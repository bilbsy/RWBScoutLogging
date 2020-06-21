import * as Discord from 'discord.js';

export function commandsowo(disccordMessage, args) {
    var success = [];
    var embedArray = [];

        embedArray.push(new Discord.MessageEmbed()
        .setColor('#7827FC')
        .setTitle('!addGuild [guildNickname][Guild Name]')
        .setDescription('*Adds a guild to the database.*'))

        embedArray.push(new Discord.MessageEmbed()
        .setColor('#0E3DFF')
        .setTitle('!setSpawnTimes [bossName] [DD-MM 00:00]')
        .setDescription('*Sets the time a spawn window for any given boss opens.*'))

        embedArray.push(new Discord.MessageEmbed()
        .setColor('#0EC8FF')
        .setTitle('!startScout [bossName]')
        .setDescription('*Starts a scouting log, !scoutStart also works.*'))

        embedArray.push(new Discord.MessageEmbed()
        .setColor('#14F440')
        .setTitle('!endScout [bossName]')
        .setDescription('*Ends a scouting log, !scoutEnd also works.*'))

        embedArray.push(new Discord.MessageEmbed()
        .setColor('#FAFA12')
        .setTitle('!scoutLog [bossName] [DD-MM 00:00] [DD-MM 00:00]')
        .setDescription('*Manually adds your time scouted if you forgot to start or end a scout log.*'))

        embedArray.push(new Discord.MessageEmbed()
        .setColor('#FB990C')
        .setTitle('!summoner [bossName]')
        .setDescription('*Declares you are a summoner at a world boss at the time of spawn.*'))

        embedArray.push(new Discord.MessageEmbed()
        .setColor('#FB290C')
        .setTitle('!bossKill [bossName] [raidSize]')
        .setDescription('*Declares a boss has been killed to then produced values for the Loot Master to roll.*'))


       
        for (var i = 0; i < embedArray.length; i++){
            success.push({
                result: true,
                errorMessage: embedArray[i]
            });
        }
    
        return success;
    }
    