const { Command } = require('klasa');
const snek = require('snekfetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['randomcat', 'meow'],
			description: 'Grabs a random cat image.'
		});
	}

	async run(msg) {
		const { body: { file } } = await snek.get('http://random.cat/meow');
		return msg.channel.sendFile(file, `cat.${file.split('.')[2]}`);
	}

};