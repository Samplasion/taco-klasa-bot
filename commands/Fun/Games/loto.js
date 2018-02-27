const { Command } = require('klasa');
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)]
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'I don\'t know what this is. Ask Andrew',
            cooldown: 3000,
        });
    }

    async run(msg, [...params]) {
      const range = this.range(100, 1);
      const loto = range.random();
      if(loto == 77) return msg.reply("you won!")
      return msg.reply("you lose!")
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