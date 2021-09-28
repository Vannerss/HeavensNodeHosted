const config = require('../config.json')
const fetch =  require('node-fetch')

module.exports = async function createTogetherCode(client, voiceChannelId, applicationID, time) {
    let returnData = {}
    return new Promise((resolve, reject) => {
        fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
                method: 'POST',
                body: JSON.stringify({
                    max_age: time,
                    max_uses: 0,
                    target_application_id: applicationID,
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    'Authorization': `Bot ${client.token}`,
                    'Content-Type': 'application/json'
                }
        }).then(res => res.json()).then(invite => {
            if (!invite || invite.error || !invite.code) reject('An error ocurred while attempting to obtain the data.');
            if (invite.code === 50013 || invite.code === '50013') reject('The bot does not have the needed permissions.');
            if (invite.code === 50035 || invite.code === '50035') reject('Bad Request');
            returnData.code = `https://discord.com/invite/${invite.code}`
            resolve(returnData);
        }).catch(e => {
            console.log(e);
        })
    })
}