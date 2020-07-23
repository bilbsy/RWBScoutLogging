import * as Discord from 'discord.js';

export function help(disccordMessage, args) {
    var success = [];
    var embedArray = [];

    switch(args[1]) {
        case 'addGuild':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#7827FC')
                .setTitle('$addGuild [guildNickname][Guild Name]')
                .setDescription('*Adds a guild to the database.*'));
        break;
        case 'setSpawnTimes':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#0E3DFF')
                .setTitle('$setSpawnTimes [bossName] [DD-MM 00:00]')
                .setDescription('*Sets the time a spawn window for any given boss opens.\n\nBoss names (kazzak, azuregos, dragons)*'));
        break;
        case 'startScout':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#0EC8FF')
                .setTitle('$startScout [bossName]')
                .setDescription('*Starts a scouting log, $scoutStart also works.\n\nBoss names (kazzak, azuregos, dragons)*'));
        break;
        case 'endScout':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#14F440')
                .setTitle('$endScout [bossName]')
                .setDescription('*Ends a scouting log, $scoutEnd also works.\n\nBoss names (kazzak, azuregos, dragons)*'));
        break;
        case 'scoutLog':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#FAFA12')
                .setTitle('$scoutLog [bossName] [DD-MM 00:00] [DD-MM 00:00]')
                .setDescription('*Manually adds your time scouted if you forgot to start or end a scout log.\n\nBoss names (kazzak, azuregos, dragons)*'));
        break;
        case 'summoner':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#FB990C')
                .setTitle('$summoner [bossName]')
                .setDescription('*Declares you are a summoner at a world boss at the time of spawn.\n\nBoss names (kazzak, azuregos, dragons)*'));
        break;
        case 'scoutBonus':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#FB990C')
                .setTitle('$scoutBonus [bossName]')
                .setDescription('*Declares you are a scouter at a world boss at the time of spawn.\n\nBoss names (kazzak, azuregos, dragons)*'));
        break;
        case 'bossKill':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#FB290C')
                .setTitle('$bossKill [bossName] [raidSize]')
                .setDescription('*Declares a boss has been killed to then produce values for the Loot Master to roll.\n\nBoss names (kazzak, azuregos, dragons)*'));
        break;
        case 'viewPoints':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#FB290C')
                .setTitle('$viewPoints')
                .setDescription('*Outputs all points accumulated across all guilds for this reset period.*'));
        break;
        case 'addremovepoints':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#FB290C')
                .setTitle('$addremovepoints [guildCode] [bossName] [points {negative to remove, positive to add}]')
                .setDescription('*Admin command to add or remove points retrospectively.*'));
        break;
        case 'resetbosspoints':
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#FB290C')
                .setTitle('$resetbosspoints [bossName]')
                .setDescription('*Resets boss points for all guild. Admin only command.*'));
        break;
        case undefined:
            embedArray.push(new Discord.MessageEmbed()
                .setColor('#0099ff')
                .addFields(
                    { name: '$help [commandName:optional]', value: 'Outputs help information. Use a command name for additional information on a command.'},
                    { name: '$startScout [bossName] [startTime:optional]', value: 'Starts a scouting log.'},
                    { name: '$endScout [bossName] [startTime:optional]', value: 'Ends a scouting log.'},
                    { name: '$scoutLog [bossName] [startTime] [endTime]', value: 'Manually adds your time scouted if you forgot to start or end a scout log.'},
                    { name: '$summoner [bossName]', value: 'Declares you are a summoner at a world boss at the time of spawn.'},
                    { name: '$scoutBonus [bossName]', value: 'Declares you are a scouter at a world boss at the time of spawn.'},
                    { name: '$bossKill [bossName] [raidSize]', value: 'Declares a boss has been killed to then produce values for the Loot Master to roll.'},
                    { name: '$viewPoints', value: 'Outputs all points accumulated across all guilds for this reset period.'},
                    { name: '$addremovepoints [guildCode] [bossName] [points]', value: 'Admin command to add or remove points retrospectively.'},
                    { name: '$addGuild [guildNickname][guildName]', value: 'Adds a new guild to be used in scouting.'},
                    { name: '$setSpawnTimes [bossName] [spawnTime]', value: 'Sets the time a spawn window for any given boss opens.'},
                    { name: '$resetbosspoints [bossName]', value: 'Resets boss points for all guild. Admin only command.'},
                )
            );
        break;
        default:
            success.push({
                result: false,
                errorMessage: "That help command was not recognised."
            });
        break;
    }

        for (var i = 0; i < embedArray.length; i++){
            success.push({
                result: true,
                errorMessage: embedArray[i]
            });
        }
    
        return success;
    }
    