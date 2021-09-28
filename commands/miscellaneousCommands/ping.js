const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Returns Pong!"),
    async run(client, interaction, language) {
        return interaction.reply('Pong!');
    },
}