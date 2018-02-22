const { Command } = require('klasa');
const request = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Like Yoda you can speak. Yes.',
            quotedStringSupport: false,
            usage: '<textToConvert:str{2,100}>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [speech]) {
      const { text } = await request.get(`http://yoda-api.appspot.com/api/v1/yodish?text=${encodeURIComponent(speech.toLowerCase())}`);
      msg.channel.send(JSON.parse(text).yodish);
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};