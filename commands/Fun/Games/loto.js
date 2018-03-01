const { Command } = require('klasa');
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)]
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'I don\'t know what this is. Ask Andrew',
            cooldown: 3,
        });
    }

    async run(msg, [...params]) {
      const num = msg.guild.configs.lotoWinNum || 77,
            top = msg.guild.configs.lotoWinMax || 100,
            object = msg.guild.configs.lotoWin || "Nothing"
      const range = this.range(top, 1);
      const loto = range.random(); // console.log(loto);
      if(loto == num) return msg.reply(`you won \`${object}\`!`)
      return msg.reply("you lose!")
    }
  
    async points(msg, user, action) {
/*    if (!row) {
        await this.client.gateways.users.schema.add('money', { type: 'integer', configurable: false, default: 0})
      }  */
      let points = user.configs.money;
      switch (action) {
        case "add":
          points++;
          break;
        case "remove":
          Math.max(0, points--);
          break;
        case "reset":
          points = 0;
          break;
        case "get":
          msg.sendEmbed(new this.client.methods.Embed()
                          .setColor(msg.guild.me.roles.highest.color || this.randomColor)
                          .setDescription(`${msg.member.displayName}, you've got ${msg.guild.configs.money ? msg.guild.configs.money : "$"}${points.toLocaleString()}`))
          // msg.reply("You've got " + points + " points.")
        // no default
      }
      user.configs.money = points;
    }
  
    range(max, min = 0) {
        const returned = []
        for (var i = min; i <= max; i++) {
          returned.push(i)
        }
        return returned
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};