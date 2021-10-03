const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();
const { token } = require('./config.json');
const { join } = require('path');
const { setInterval } = require('timers');

const client = new Client({intents: [Intents.FLAGS.GUILDS, 
                                     Intents.FLAGS.GUILD_MEMBERS,
                                     Intents.FLAGS.GUILD_MESSAGES,
                                     Intents.FLAGS.GUILD_VOICE_STATES,
                                     Intents.FLAGS.GUILD_INVITES,
                                     Intents.FLAGS.GUILD_PRESENCES]});

client.commands = new Collection();
client.selectMenus = new Collection();
client.languages = require('i18n');

client.languages.configure({
    locales: ['en', 'es'],
    directory: join(__dirname, "locales"),
    defaultLocale: 'en',
    retryInDefaultLocale: true,
    objectNotation: true,
    register: global,

    logWarnFn: function (msg) {
        console.log('WARN' + msg)
    },

    logErrorFn: function (msg) {
        console.log('ERROR' + msg);
    },

    missingKeyFn: function(locale, value) {
        return value;
    },

    mustacheConfig: {
        tags: ["{{","}}"],
        disable: false
    }
})

async function updateStatus() {
    const guildNum = await client.guilds.cache.size;
    const memberNum = await client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0);

    await client.user.setActivity(`Servers: ${guildNum} Members: ${memberNum}`, { type: "LISTENING"})
}

setInterval(() => {
    updateStatus()
}, 60000)

require("./handlers/commands.js")(client);
require("./handlers/events.js")(client);
require("./handlers/selectmenus.js")(client);

client.login(token);