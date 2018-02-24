const { Command } = require('klasa');
var cowsay = require("cowsay");


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Cows think.',
			usage: '<text:str>'
		});
	}

	async run(msg, [banner]) {

    msg.channel.send(`\`\`\`\n${cowsay.think({
      text : banner,
    })}\n\`\`\``);
	}

};