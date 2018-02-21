const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Rings a bell on the server blaming the mentioned person.',
			usage: '<user:mention>',
			permLevel: 10,
		});
	}

	async run(msg, [user]) {
		msg.author.send(`${client.guilds.map(g => `${g.name} (${g.id})`).join('\n')}`, { code: "xl" });
		msg.sendMessage("📥 | Guilds have been sent to your DMs.");
	}

};
