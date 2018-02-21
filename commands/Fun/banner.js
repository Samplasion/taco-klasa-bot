const { Command } = require('klasa');
const Discord = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Creates a banner from the string you supply.',
			usage: '<banner:str>'
		});
	}

	async run(msg, [banner]) {
    const embed = new Discord.MessageEmbed()
      .setImage(`https://dummyimage.com/2000x500/33363c/ffffff&text=${encodeURIComponent(banner)}`)
    return msg.channel.send(/*"https://dummyimage.com/2000x500/36393e/ffffff&text=Testing"*/embed);
	}

};