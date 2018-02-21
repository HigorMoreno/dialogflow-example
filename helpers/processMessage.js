const API_AI_TOKEN = '92a892246e2d4e31a28931fa98645a69';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAa7vra6bn4BAADTiHZCBBCQjieKNsi5vzjVUSYQrwUXgj7ACO64LqJKWehNmZBeR9rzuuuSKaZApuJrTsm0DWro4o6ZCtiez9GUZCocjSU1ZBegEmUjewRgVwSFJ62MglnaNUvZBNN6cww8pQYLc5ghgnPoUgZAZAJxNLKr279KEcOUUHEUi7oHZB';
const request = require('request');
const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'yocale-bot'});
    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};