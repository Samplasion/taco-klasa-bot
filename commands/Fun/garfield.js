const { Command } = require('klasa');
let moment = require('moment');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Get a random Garfield comics page.',
        });
    }

    async run(msg, [...params]) {
      let year = this.random(1990, 2016);
      let day = this.random(0, 366);
      let date = moment().year(year).dayOfYear(day);
      let dateFormat = date.format('YYYY-MM-DD');
      let dateYear = date.year();
      msg.sendMessage(`https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/${dateYear}/${dateFormat}.gif`)
    }
  
    random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};