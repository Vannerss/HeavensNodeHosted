const fs = require('fs');
const selectmenus = fs.readdirSync('./selectMenus');

module.exports = (client) => {
    for (const file of selectmenus) {
        const selectmenu = require(`../selectMenus/${file}`);
        client.selectMenus.set(selectmenu.data.name, selectmenu);
    }
}