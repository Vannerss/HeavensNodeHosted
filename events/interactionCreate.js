const executeCommand = require('../functions/executeCommand.js');
const executeSelectMenu = require('../functions/executeSelectMenu.js');



module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        const test = true;
        if(interaction.isCommand()) executeCommand(client, interaction);
        if(interaction.isSelectMenu()) executeSelectMenu(client, interaction);
        //if(music.isConnected()) executeMusicInfo(client, interaction);
    }
}