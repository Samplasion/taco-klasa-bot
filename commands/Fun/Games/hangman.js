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
            aliases: ["hang", "hman", "guess"],
            runIn: ['text'],
            usage: '[new] [letter:str{1,1}]',
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
        "gas",
        "hierarchy",
        "identifier",
        "imagine",
        "jamming",
        "kamikaze",
        "lovely",
        "madness",
        "nemesis",
        "oasis",
      ]
      this.money = [
        1,
        2,
        3,
        4,
        5
      ]
      this.options = {
        maxAttempt: 15,
        concealCharacter: '-'
      }
    }

    async run(msg, [command, letter]) {
      if (command == "new") {
        const word = this.words.random()
        if (this.client.hangman.status[msg.author.id] != undefined) return msg.reply("finish your game before starting a new one.")
        hangman.configure(this.options);
        var game = hangman.newGame(word);
        game.start()
        msg.sendEmbed(new this.client.methods.Embed()
                      .setColor(msg.guild.me.roles.highest.color || this.randomColor)
                      .setAuthor(msg.member.displayName, msg.author.displayAvatarURL())
                      .addField("Word", `${"```"}${game.getConcealedPhrase()}${"```"}`)
//                    .addField("Attempts left", attempts, true)
//                    .addField("Guesses", `${game.guesses.join(", ")}`, true)
//                    .addField("Hits and Misses", `Hits: ${game.hits.join(", ") || "No hits"} | Misses: ${game.misses.join(", ") || "No misses"}`)
                     )
        // msg.channel.send(`${"```"}${game.getConcealedPhrase()}${"```"}`);
        this.client.hangman.word[msg.author.id] = word;
        this.client.hangman.attempts[msg.author.id] = 5;
        return this.client.hangman.status[msg.author.id] = game;
      }
      if (!this.client.hangman.attempts[msg.author.id]) this.client.hangman.attempts[msg.author.id] = 5;
      let attempts = this.client.hangman.attempts[msg.author.id];
      if (!this.client.hangman.status[msg.author.id]) return msg.reply("start a game before guessing letters.")
      var game = this.client.hangman.status[msg.author.id];
      if (!letter || letter == undefined || letter == "") throw 'You cannot guess nothing or something more than one letter';
      if (game.guesses.includes(letter)) return msg.reply("you've already tried that letter!");
      await game.guess(letter); // console.log(game);
      if(game.misses.includes(letter)) attempts -= 1
      if(attempts == 0) game.end("LOST")
      if(game.status == "WON") {
        const mon = msg.author.configs.money + this.money.random();
        msg.reply("you won " + msg.guild.configs.money + mon + "! The word was: " + game.getConcealedPhrase())
        delete this.client.hangman.status[msg.author.id];
        return msg.author.configs.update("money", mon)
      }
      if(game.status == "LOST") {
        msg.reply("you lost! The word was: " + this.client.hangman.word[msg.author.id])
        delete this.client.hangman.status[msg.author.id];
        return msg.author.configs.update("money", Math.max(0, msg.author.configs.money--))
      }
      // msg.channel.send(`${"```"}${game.getConcealedPhrase()}${"```"}`);
      msg.sendEmbed(new this.client.methods.Embed()
                      .setColor(msg.guild.me.roles.highest.color || this.randomColor)
                      .setAuthor(msg.member.displayName, msg.author.displayAvatarURL())
                      .addField("Word", `${"```"}${game.getConcealedPhrase()}${"```"}`)
                      .addField("Attempts left", attempts, true)
                      .addField("Guesses", `${game.guesses.join(", ")}`, true)
                      .addField("Hits and Misses", `Hits: ${game.hits.join(", ") || "No hits"} | Misses: ${game.misses.join(", ") || "No misses"}`)
                    )
      this.client.hangman.status[msg.author.id] = game;
      this.client.hangman.attempts[msg.author.id] = attempts;
      // console.log(game);
    }

    async init() {
      this.client.hangman = {
        status: [],
        word: [],
        attempts: [],
      }
    }

};