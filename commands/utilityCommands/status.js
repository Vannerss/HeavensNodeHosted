const {SlashCommandBuilder, bold} = require('@discordjs/builders');
const config = require('../../config.json');
const Discord = require('discord.js');
const moment = require('moment');
const osu = require('node-os-utils');
const os = require('os');
require('moment-duration-format')
const diagramMaker = require('../../functions/diagramMaker.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Returns the bot status.'),
    async run(client, interaction, language) {
        interaction.reply({content: 'Fetching status...', ephemeral: true});
        const totalGuilds = client.guilds.cache.size;
        const totalMembers = await client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0);

        var mem = osu.mem;
        let freeRAM, usedRAM, cpuUsage;

        mem.info().then(info => {
            freeRAM = info.freeMemMb;
            usedRAM = info.totalMemMb - freeRAM;
        })

        const cpu = osu.cpu;
        const p1 = cpu.usage().then(cpuPercentage => {
            cpuUsage = cpuPercentage;
        });

        await Promise.all([p1]);

        const embed = new Discord.MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setAuthor(`State of ${client.user.username}`)
            .setThumbnail(client.user.displayAvatarURL({format: 'png', dynamic: true, size: 4096}))
            .addField('Performance', "```" +`RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round((100 * usedRAM) / (usedRAM + freeRAM))}%] \nCPU: ${diagramMaker(cpuUsage, 100 - cpuUsage)} [${Math.round(cpuUsage)}%]` + "```", false)
            .addField('System', "```" + `Processor\nAMD ${(os.totalmem() /1024 / 1024/ 1024).toFixed(2)}GB` + "```", false)
            .addField('Operating System', "```" + `${os.type} ${os.release} ${os.arch}` + "```", false)
            .addField('Total Users', "```" +`${totalMembers}`+ "```", false)
            .addField('Total Servers', "```" +`${totalGuilds}`+ "```", true)
            .addField('Total Server Emotes', "```" +`${client.emojis.cache.size}`+ "```", true)
            .addField('Bot UpTime', "```" + `${moment.duration(client.uptime).format(`D [Days], H [Hours], m [Minutes], s [Seconds]`)}` + "```", true)
            .addField('Host UpTime', "```" + `${moment.duration(os.uptime * 1000).format(`D [Days], H [Hours], m [Minutes], s[Seconds]`)}` + "```", true)
            .addField(`Last Log` , "```" +`${moment(client.readyAt).format("DD MMM, YYYY HH:mm")}`+ "```", true)
        interaction.editReply({content: ' ', embeds: [embed], ephemeral: true});    
    }
}