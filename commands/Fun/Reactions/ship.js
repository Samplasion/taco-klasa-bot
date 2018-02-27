const { Command } = require('klasa');
let axios = require('axios');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: 'Ship someone :heart:~ (WIP)',
            usage: '<someone:mention>',
        });
      this.randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    }

    async run(msg) {
      const someone = msg.mentions.members.first() != undefined ? msg.mentions.members.first() : msg.member;
      this.getShip(msg, this.creatingWord(msg.member.displayName, someone.displayName))
    }
    
    async getShip(msg, ship) {
      const embed = new this.client.methods.Embed()
        .setColor(msg.guild.me.roles.highest.color || this.rC)
        .setTitle(`**Ship incoming~**`)
        .setDescription(`${msg.member.displayName} requested the ship: ${ship} :heart:`)
      return msg.sendEmbed(embed);
    }
  
    creatingWord(one, two){
      var output = "";
      for (var i = 0; i < Math.max(one.length, two.length); i++) {
        if (one.length > i) {
            output += one[i];
        }
        if (two.length > i) {
            output += two[i];
        }
      }
      return output;
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};