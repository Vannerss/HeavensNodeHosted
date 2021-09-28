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
                    value: 'fishing'
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
                },
                {
                    label: 'Letter Tile',
                    description: 'Creates a Letter Tile session',
                    value: 'lettertile'
                },
                {
                    label: 'Word Snack',
                    description: 'Creates a Word Snack session',
                    value: 'wordsnack'
                },
                {
                    label: 'Doodle Crew',
                    description: 'Creates a Doodle Crew session',
                    value: 'doodlecrew'
                },
            ])
        )
        await interaction.reply({content: 'Select an application to start a shared session', components: [row], ephemeral: true});
    }
}

