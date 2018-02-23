const { Command } = require('klasa');
var cowsay = require("cowsay");


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Creates an ASCII banner from the string you supply.',
			usage: '<text:str>',
      cooldown: 5,
      permLevel: 3,
      runIn: ['text', 'group']
		});
	}

	async run(msg, [banner]) {

    msg.channel.send(`${banner}`, { tts: true })
      .catch(
        msg.reply("probably I haven't enough permission to send a message with Text-To-Speech.")
    );
	}

};