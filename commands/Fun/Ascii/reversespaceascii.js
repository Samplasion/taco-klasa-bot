const { Command } = require('klasa');
const figletAsync = require('util').promisify(require('figlet'));

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
      aliases: ["rsa", "revspascii"],
			description: 'Creates a reverse spaced ascii banner from the string you supply.',
			usage: '<banner:str>'
		});
	}

	async run(msg, [banner]) {
		const data = await figletAsync(banner.split("").reverse().join(" "));
		return msg.sendCode('', data);
	}

};