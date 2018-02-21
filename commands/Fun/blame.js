const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Rings a bell on the server blaming the mentioned person.',
			usage: '<user:mention>'
		});
	}

	async run(msg, [user]) {
		return msg.send(`🔔 BLAME 🔔 ${user} 🔔 BLAME 🔔`);
	}

};
