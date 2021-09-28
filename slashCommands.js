const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')
const {clientId, guildId, token } = require('./config.json');

const rest = new REST({ version: '9'}).setToken(token);

async function createSlash() {
    try{
        const commands = [];
        fs.readdirSync('./commands').forEach(async (category) => {
            const commandFiles = fs.readdirSync(`./commands/${category}`).filter((file) => file.endsWith('.js'))
            for (const file of commandFiles){
                const command = require(`./commands/${category}/${file}`);
                commands.push(command.data.toJSON());
            }
        })
        const commandsEmpty = [];

        await rest.put (
            //Commands to be only apply to the guildId Guild. (1Server)
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
            //Commands to be apply to all the Guilds the bot is a member of
            // Routes.applicationCommands(clientId),
            // { body: commandsEmpty }
        )
        console.log('Command Sent.')
    } catch(e) {
        console.error(e);
    }
}

createSlash()