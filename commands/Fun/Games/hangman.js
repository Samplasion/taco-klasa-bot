const { Command } = require('klasa');
const hangman = require('hangman-engine')
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)]
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            /* enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            permLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: '',
            quotedStringSupport: false, */
            aliases: ["hang", "hman"],
            usage: '<new|guess> [letter:str{1,1}]',
            usageDelim: " ",
            extendedHelp: 'No extended help available.'
        });
      this.words = [
        "apple",
        "banana",
        "car",
        "destiny",
        "eris",
        "freshness",
        "gas"
      ]
      this.options = {
        maxAttempt: 10,
        concealCharacter: '_'
      }
    }

    async run(msg, [command, letter]) {
      if (command == "new") {
        const word = this.words.random()
        if (this.client.hangman.status[msg.author.id] != undefined) return msg.reply("finish your game before starting a new one.")
        hangman.configure(this.options);
        var game = hangman.newGame(word);
        game.start()
        msg.channel.send(`${"```"}${game.getConcealedPhrase()}${"```"}`);
        this.client.hangman.word[msg.author.id] = word;
        return this.client.hangman.status[msg.author.id] = game;
      }
      if (!this.client.hangman.status[msg.author.id]) return msg.reply("start a game before guessing letters.")
      var game = this.client.hangman.status[msg.author.id];
      if (!letter || letter == undefined || letter == "") throw 'You cannot guess anything';
      if (game.guesses.includes(letter)) return msg.reply("you've already tried that letter!");
      await game.guess(letter);// console.log(game)
      if(game.status == "WON") {
        msg.reply("you won! The word was " + game.getConcealedPhrase())
        delete this.client.hangman.status[msg.author.id]
      }
      if(game.status == "LOST") {
        msg.reply("you lost! The word was " + this.client.hangman.word[msg.author.id])
        delete this.client.hangman.status[msg.author.id]
      }
      msg.channel.send(`${"```"}${game.getConcealedPhrase()}${"```"}`);
      this.client.hangman.status[msg.author.id] = game;
      // console.log(game);
    }

    async init() {
      this.client.hangman = {
        status: [],
        word: [],
      }
    }

};