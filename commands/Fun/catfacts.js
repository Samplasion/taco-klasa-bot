const { Command } = require('klasa');
const snekfetch = require('snekfetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['catfact', 'kittenfact'],
			description: 'Gives you a random cat fact.'
		});
	}

	async run(msg) {
		return snekfetch.get('https://catfact.ninja/fact')
			.then(res => msg.send(`📢 **Cat fact:** *${res.body.fact}*`));
	}

};
