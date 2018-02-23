const { Command } = require('klasa');
var cowsay = require("cowsay");


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Creates an ASCII banner from the string you supply.',
			usage: '<text:str>'
		});
	}

	async run(msg, [banner]) {

    msg.channel.send(`\`\`\`\n${cowsay.say({
      text : banner,
    })}\n\`\`\``);
	}

};