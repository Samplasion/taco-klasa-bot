const { Command } = require('klasa');
const textanary = require("textanary");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: ["bin"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Reverses a string',
            quotedStringSupport: false,
            usage: '<txt|bin> <stringToConvert:str>',
            usageDelim: ", ",
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [cmd, txt]) {
      let bin;
      if (cmd == "txt") {
        bin = textanary({to: "text", data: txt});
      } else {
        bin = textanary({to: "binary", data: txt});
      }
      msg.channel.send(`\`\`\`${bin.match(/.{1,8}/g).join(" ")}\`\`\``)
    }
  
    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};