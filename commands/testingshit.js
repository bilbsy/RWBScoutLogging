import * as Discord from 'discord.js';

export function test(disccordMessage, args) {
    var success = [];
    var embedArray = [];

        embedArray.push(new Discord.MessageEmbed()
        .setColor('#00AAFF')
        .addFields (
            { name: 'test 1', value: 'test 2', inline: true},
            { name: 'test 3', value: 'test 4', inline: true},
            { name: 'test 5', value: 'test 6', inline: true}))

        for (var i = 0; i < embedArray.length; i++){
            success.push({
                result: true,
                errorMessage: embedArray[i]
            });
        }
    
        return success;
    }