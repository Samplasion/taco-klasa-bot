const { Command } = require('klasa');
var cleverbot = require("cleverbot.io"),
    bot       = new cleverbot('YnocDmSaIxNRTM6t','RoHXlXZjsUzxfcEwgMgh0B6syErJc7eM');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 5,
            aliases: ["chat"],
            permLevel: 0,
            description: 'Chat with cleverbot',
            usage: '<whatToSay:str>',
        });
    }

    async run(msg, [...params]) {
      if (this.client.clbot.sessions[msg.author.id] !== undefined) {
        bot.setNick(this.client.clbot.sessions[msg.author.id]);
        bot.ask(params, function (err, response) {
          if(err) console.error(err)
          msg.reply(response);
        });
      } else {
        const cll = this.client;
        bot.create(function (err, session) {
          if(err) console.error(err)
          cll.clbot.sessions[msg.author.id] = session
        });
        // console.log(cll.clbot.sessions[msg.author.id])
        bot.ask(params, function (err, response) {
          if(err) console.error(err)
          msg.reply(response);
        });
      }
    }

    async init() {
      this.client.clbot = {
        sessions: [],
      }
    }

};