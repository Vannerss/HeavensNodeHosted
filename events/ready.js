const mongoose = require('mongoose');
const config = require('../config.json');

module.exports = {
    name:'ready',
    execute(client){
        mongoose.connect(config.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const malClientId = config.malClientId;
        const malClientSecret = config.malClientSecret;

        










        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}