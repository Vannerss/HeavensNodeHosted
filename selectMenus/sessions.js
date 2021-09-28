const createTogetherCode = require('../functions/createTogether.js');
const {MessageEmbed} = require('discord.js');
const config = require('../config.json');
let applicationID

module.exports = {
    data: {
        name: 'sessions'
    },
    async run(client, interaction, language){
        if (!interaction.member.voice.channel) return interaction.update({content: client.languages.__({phrase: 'youtube.noChannel', locale: language}), ephemeral: true});
        switch(interaction.values[0]) {
            case 'youtube':
                applicationID = '755600276941176913';
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
        createTogetherCode(client, interaction.member.voice.channel.id, applicationID, 900).then(invite => {
            const embed = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(client.languages.__mf({phrase: 'youtube.inviteMessage', locale: language}, {inviteLink: invite.code}))
            .setURL(`${invite.code}`)
            return interaction.update({content: ' ', components: [], embeds: [embed]})
        }).catch(e => {
            if (e == 'An error ocurred while attempting to obtain the data.') {
                const errorembed = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle(client.languages.__({phrase: 'utilities.errorEmbed', locale: language}))
                    .setDescription(clien.languages.__({phrase: 'utilities.enexpectedError', locale: language}))
                    .setFooter(interaction.member.user.username, interaction.member.user.avatarURL());
                return interaction.update({content: ' ', components: [], embeds: [errorembed]})
            } else if (e == 'The bot does not have the needed permissions.') {
                const errorembed = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle(client.languages.__({phrase: 'utilities.errorEmbed', locale: language}))
                    .setDescription(clien.languages.__({phrase: 'utilities.noInvitePerms', locale: language}))
                    .setFooter(interaction.member.user.username, interaction.member.user.avatarURL());
                return interaction.update({content: ' ', components: [], embeds: [errorembed]})
            } else if (e == 'Bad Request') {
                const errorembed = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle(client.languages.__({phrase: 'utilities.errorEmbed', locale: language}))
                    .setDescription(clien.languages.__({phrase: 'utilities.BadRequest', locale: language}))
                    .setFooter(interaction.member.user.username, interaction.member.user.avatarURL());
                return interaction.update({content: ' ', components: [], embeds: [errorembed]})
            } else {
                console.log(e);
            }
        })
    }
}