const { Command } = require('klasa');
const snekfetch = require('snekfetch');

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
            usage: '[letter:str{1,1}]',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [letter]) {
      if(!this.client.tokens) this.client.tokens = []
      if(letter != undefined) {
        if(!this.client.tokens[msg.author.id]) return msg.reply("start a new game by not imputing words");
        const string = await this.guess(msg, this.client.tokens[msg.author.id], letter);
        if (!string.includes("_")) this.client.tokens.pop(msg.author.id);
      }
      const { body } = await snekfetch.post("http://hangman-api.herokuapp.com/hangman")
      console.log(body)
      const word  = body.hangman;
      this.client.tokens[msg.author.id] = body.token;
      msg.sendMessage(`New hangman: \`\`\`${word}\`\`\``); console.log(this.client.tokens[msg.author.id]);
    }
    
    async guess(msg, token, letter) {
      const { body: response } = await snekfetch.put("http://hangman-api.herokuapp.com/hangman").send({ token: token, letter: letter });
      response.correct == true ? msg.sendMessage(`Correct guess! Word: ${response.hangman}`) : msg.sendMessage(`Wrong guess! Word: ${response.hangman}`)
      return response.hangman
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};