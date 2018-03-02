const { Command, KlasaUser } = require('klasa');
const figletAsync = require('util').promisify(require('figlet'));

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Creates an ASCII banner from the string you supply.',
			usage: '<text:str>'
		});
	}

	async run(msg, [banner]) {
		const data = await figletAsync(banner);
		return msg.sendCode('', data);
	}

};