const { Command } = require('klasa');
const TicTacToe = require('tictactoejs');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            cooldown: 0,
            aliases: ["ttt"],
            description: 'A very simple tic-tac-toe command.',
            quotedStringSupport: false,
            usage: '<new|move|grid> [move:str]',
            usageDelim: " ",
            extendedHelp: `- start                 Starts a new game\n- move <move(col,row)>  Moves your symbol through the board
BOARD:
Y

3   1,3 | 2,3 | 3,3
    ---------------
2   1,2 | 2,2 | 3,2
    ---------------
1   1,1 | 2,1 | 3,1

     1     2     3	X`
        });
    }

    async run(msg, [command, move]) {
      var game;
      if (command == "new") {
        if (this.client.ttt.status[msg.author.id]) {
          return msg.reply("finish the started game before starting a new one.")
        }
        game = new TicTacToe.TicTacToe();
        msg.channel.send(`\`\`\`${game.ascii()}\`\`\``); // check board
        return this.client.ttt.status[msg.author.id] = game;
      }
      if (command == "grid") {
        game = this.client.ttt.status[msg.author.id];
        if (!game) return msg.reply("there's no game... so no grid!");
        return msg.channel.send(`\`\`\`${game.ascii()}\`\`\``); // check board
      }
      game = this.client.ttt.status[msg.author.id];
      if(!move || move == undefined) return msg.reply("hey, where do you want to move?")
      const moves = move.split(","); 
      // console.log(moves);
      const col = parseInt(moves[0]), row = parseInt(moves[1])
      if (game.status() != "in progress") {
        // client.ttt.status.delete(msg.author.id)
        delete this.client.ttt.status[msg.author.id]
        if (game.status() != "draw") {
          if (game.status() == "X") {
            msg.reply(`X (you) won!`);
          } else {
            msg.reply(`O (the AI) won!`);
          }
        } else {
          msg.reply(`It's a draw!`);
        }
        return msg.channel.send(`\`\`\`${game.ascii()}\`\`\``); // check board
      }
      game.turn(); // first move will be X
      game.move(col, row);
      if (game.status() != "in progress") {
        // client.ttt.status.delete(msg.author.id)
        delete this.client.ttt.status[msg.author.id]
        if (game.status() != "draw") {
          if (game.status() == "X") {
            msg.reply(`X (you) won!`);
          } else {
            msg.reply(`O (the AI) won!`);
          }
        } else {
          msg.reply(`It's a draw!`);
        }
        return msg.channel.send(`\`\`\`${game.ascii()}\`\`\``); // check board
      }
      game.turn(); // will be O
      game.randomMove();
      if (game.status() != "in progress") {
        // client.ttt.status.delete(msg.author.id)
        delete this.client.ttt.status[msg.author.id]
        if (game.status() != "draw") {
          if (game.status() == "X") {
            msg.reply(`X (you) won!`);
          } else {
            msg.reply(`O (the AI) won!`);
          }
        } else {
          msg.reply(`It's a draw!`);
        }
        return msg.channel.send(`\`\`\`${game.ascii()}\`\`\``); // check board
      }
      msg.channel.send(`\`\`\`${game.ascii()}\`\`\``); // check board
      this.client.ttt.status[msg.author.id] = game;
      if (game.status() != "in progress") {
        // client.ttt.status.delete(msg.author.id)
        delete this.client.ttt.status[msg.author.id]
        if (game.status() != "draw") {
          if (game.status() == "X") {
            msg.reply(`X (you) won!`);
          } else {
            msg.reply(`O (the AI) won!`);
          }
        } else {
          msg.reply(`It's a draw!`);
        }
        return msg.channel.send(`\`\`\`${game.ascii()}\`\`\``); // check board
      }
    }

    async init() {
      this.client.ttt = {
        status: [],
      }
    }

};