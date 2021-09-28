const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('sessions')
        .setDescription('Create a session of a application in discord.'),
    async run(client, interaction, language) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('sessions')
            .setPlaceholder('application')
            .addOptions([
                {
                    label: 'Youtube',
                    description: 'Creates a Youtube Together session.',
                    value: 'youtube'
                },
                {
                    label: 'Fishington',
                    description: 'Creates a Fishington session',
                    value: 'fishington'
                },
                {
                    label: 'Betrayal',
                    description: 'Creates a Betrayal session',
                    value: 'betrayal'
                },                
                {
                    label: 'Poker',
                    description: 'Creates a Poker session',
                    value: 'poker'
                },                
                {
                    label: 'Chess',
                    description: 'Creates a Chess session',
                    value: 'chess'
                }
            ])
        )
        await interaction.reply({content: 'Select an application to start a shared session', components: [row], ephemeral: true});
    }
}
