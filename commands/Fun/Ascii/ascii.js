const { Command, KlasaUser } = require('klasa');
const figletAsync = require('util').promisify(require('figlet'));
const ascii = require("image-to-ascii");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Creates an ASCII banner from the string you supply.',
			usage: '<user:user|text:str>'
		});
	}

	async run(msg, [banner]) {
    /*if(!banner || typeof(banner) == KlasaUser) {
      if (!banner) {
        ascii(msg.author.avatarURL(), { colored: false, size: { width: 28, height: 28 } }, (err, result) => {
          msg.channel.createMessage(`\`\`\`\n${result}\n\`\`\``)
        });
      }
      
    }*/
		const data = await figletAsync(banner);
		return msg.sendCode('', data);
	}

};