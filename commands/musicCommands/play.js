const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const { MessageEmbed } = require('discord.js');
// const getMusicInfo = require('../../getters/getMusicInfo');
const events = music.event;

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song in the voice channel.')
        .addStringOption(string => 
            string
                .setName('song')
                .setDescription('Play a given song name/URL in the voice channel')
                .setRequired(true)),
	async run(client, interaction, language) {
        /* This will get the song that has been provided */
        const song = interaction.options.getString('song');
        let songInf;
        /* Gets the voice channel where the member is in. If the member isn't in any, return. */
        const voiceChannel = interaction.member.voice.channel;
        if(!voiceChannel) return interaction.reply({ content: 'You need to be in a voice channel!', ephemeral: true });

        music.play({
            interaction: interaction,
            channel: voiceChannel,
            song: song
        })
	},
};