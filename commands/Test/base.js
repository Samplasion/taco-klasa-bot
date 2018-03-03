const { Command } = require('klasa');
const Jimp = require("jimp")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: [],
            permLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: '',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
      // This is where you place the code you want to run for your command
      msg.channel.send("<:dblMod:401724520806875139>")
      require('klasa/package.json')._resolved
    }

    async init() {
      // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};