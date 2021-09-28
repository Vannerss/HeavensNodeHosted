const {MessageEmbed, } = require('discord.js');
const config = require('../config.json');
const {DiscordTogether} =require('discord-together');
module.exports = {
    data: {
        name: 'sessions'
    },
    async run(client, interaction, language){
        client.discordTogether = new DiscordTogether(client);
        if (!interaction.member.voice.channel) return interaction.update({content: client.languages.__({phrase: 'youtube.noChannel', locale: language}), ephemeral: true});
        switch(interaction.values[0]) {
            case 'youtube':
                //applicationID = '755600276941176913';
                client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(client.languages.__mf({phrase: 'youtube.inviteMessage', locale: language}, {inviteLink: invite.code}))
                    .setURL(`${invite.code}`)
                    return interaction.update({content: ' ', components: [], embeds: [embed]})
                });
                break;
            case 'fishington':
                applicationID = '814288819477020702';
                break;
            case 'poker':
                applicationID = '755827207812677713';
                break;
            case 'betrayal':
                applicationID = '773336526917861400';
                break;
            case 'chess':
                applicationID = '832012774040141894';
                break;
        }
    }    
}