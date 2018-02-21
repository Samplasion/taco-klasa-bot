const { Command } = require('klasa');

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
            description: 'Reverses a string',
            quotedStringSupport: false,
            usage: '<stringToReverse:str>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
      const stri = params.join(" ")
      msg.channel.send(stri.split("").join(" "));
    }
  
    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};