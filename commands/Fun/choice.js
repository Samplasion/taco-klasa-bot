const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['choose', 'decide'],

			description: 'Makes a decision for your given life choices.',
			usage: '<choices:str> [...]',
			usageDelim: ', '
		});
	}

	async run(msg, [...choices]) {
		return msg.reply(choices.length === 1 ?
			'You only gave me one choice, dummy.' :
			`If I were you, I'd choose ${choices[Math.floor(Math.random() * choices.length)]}`);
	}

};
