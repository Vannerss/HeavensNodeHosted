const {SlashCommandBuilder, bold} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Returns your or another users avatar.')
        .addUserOption(option => option.setName('target').setDescription('The user of the avatar you want to see')),
    async run(client, interaction, language) {
        const user = interaction.options.getUser('target');
        if(user) {
            const embed = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(bold(client.languages.__mf({phrase: 'avatar.objective', locale: language}, { username: user.username })))
            .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            return interaction.reply({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(bold(client.languages.__({phrase: 'avatar.self', locale: language})))
            .setImage(interaction.user.displayAvatarURL({dynamic: true, size: 4096}))
            return interaction.reply({embeds: [embed]})
        }
    }
}