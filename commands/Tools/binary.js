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
            usage: '<stringToConvert:str>',
            usageDelim: ", ",
            extendedHelp: 'No extended help available.'
        });
    }
  
    check(str) {
      const num = /^[0-1 ]*$/gm;
      if (str.match(num)) {
       return true;
      }
      return false;
    }

    async run(msg, [txt]) {
      let bin;
      if (this.check(txt)) {
        bin = textanary({to: "text", data: txt.split(" ").join("")});
      } else {
        bin = textanary({to: "binary", data: txt});
      }
      msg.channel.send(`\`\`\`${bin.match(/.{1,8}/g).join(" ")}\`\`\``)
    }
  
    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};