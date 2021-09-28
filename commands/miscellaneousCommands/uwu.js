const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uwu')
        .setDescription("Returns UwU"),
    async run(client, interaction, language) {
        return interaction.reply('UwU');
    },
}