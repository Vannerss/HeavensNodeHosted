const {SlashCommandBuilder, codeBlock} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const config = require('../../config.json');

const fetch = require('node-fetch');

const Jikan = require('jikan-node');
const mal = new Jikan();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime')
        .setDescription('Finds the bio of an anime in My Anime List')
        .addStringOption(option => option.setName('title').setDescription('Name of the anime you want to find.').setRequired(true)),
    async run(client, interaction, language) {
        const animeTitle = interaction.options.getString('title');

        let settings = {method: "Get"};
        //fetch(`https://api.jikan.moe/v3/search/anime?q=${animeTitle}&page=1`, settings).then(res=>res.json()).then((json) => {
        mal.search('anime', animeTitle, {page: 1}).then(res=>res.json()).then((json) => {
            let airing = 'undefined';
            const episodes = json.results[0].episodes

            if(json.results[0].airing){
                airing = 'Finished Airing'
            } else {
                airing = 'Airing'
            }

            const embed = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setTitle(json.results[0].title)
            .setDescription(`**Description:**\n ${json.results[0].synopsis}`)
            .addFields(
                {name: '*Episodes:*', value: codeBlock(episodes), inline: true},
                {name: '*Status:*', value: `${airing}`, inline: true}
            )
            .setImage(`${json.results[0].image_url}`);
            interaction.reply({embeds: [embed]});
        })
    }
}