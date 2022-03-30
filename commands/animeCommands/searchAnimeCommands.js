const {SlashCommandBuilder, codeBlock} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const config = require('../../config.json');
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
        mal.search('anime', animeTitle, {type: 'TV'}).then(res=>res).then((json) => {
            const id = json.results[0].mal_id;
            mal.findAnime(id).then(res => res).then((anime) => {
                const title = anime.title;
                const url = anime.url;
                const episodes = anime.episodes;
                const genre = anime.genres;
                const status = anime.status;
                const image = anime.image_url;
                const synopsis = anime.synopsis;
                const rating = anime.score;
                const ranking = anime.rank;

                let genreString = '';

                for(let i = 0; i < genre.length; i++){
                    genreString += genre[i].name;
                    if((genre.length - i) != 1){
                        genreString += ', ';
                    }
                }

                const embed = new MessageEmbed()
                .setColor(config.defaultSuccessColor)
                .setTitle(title).setURL(url)
                .setDescription('**Description:**\n' + synopsis)
                .addFields(
                    {name: '*Episodes:*', value: codeBlock(episodes), inline: true},
                    {name: '*Status:*', value: codeBlock(status), inline: true},
                    {name: '*Genres*', value: codeBlock(genreString), inline: true},
                    {name: '*Rating:*', value: codeBlock(rating), inline: true},
                    {name: '*Ranking:*', value: codeBlock(ranking), inline: true},
                )
                .setImage(image);
                interaction.reply({embeds: [embed]});
            }).catch(err=> console.log(err))
        }).catch(err=> console.log(err))
    }
}