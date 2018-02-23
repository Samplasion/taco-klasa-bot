const { Command } = require('klasa');
const { parse } = require('sherlockjs');

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
            description: '',
            quotedStringSupport: false,
            usage: '<time:str> [reason:str] [...]',
            usageDelim: " ",
        });
    }

    async run(msg, [Time, ...reasn]) {
      const { parseTime, format } = this
      const time = parseTime(Time).startDate;
      const reason = reasn.join(" ")
      // return console.log()
      this.client.schedule.create('reminder', /*Date.now() + (1000 * 10)*/time, {
        data: {
          // This is the metadata. In one minute after the creation of this scheduled
          // task, Schedule will call your new task with this object.
          user: msg.author.id,
          text: reason == undefined ? reason : "No reason",
          channel: msg.channel.id
        }
      })
        .then(msg.sendMessage(`Ok, I will remind you of \`${reason == undefined ? reason : "No reason"}\` in ${""}.`));
    }
    parseTime(input) {
      const remindTime = parse(input);
      return remindTime;
    }

    validateTime(input) {
      const remindTime = parse(input);
      if (!remindTime.startDate) return false;
      return true;
    }
  
    format(seconds) {
      const { pad } = this;
      let hours = Math.floor(seconds / (60 * 60));
      let minutes = Math.floor(seconds % (60 * 60) / 60);
      let seconds2 = Math.floor(seconds % 60);

      return `${pad(hours)}:${pad(minutes)}:${pad(seconds2)}`;
    }

    pad(seconds) {
      return (seconds < 10 ? '0' : '') + seconds;
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};