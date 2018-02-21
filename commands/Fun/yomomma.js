const { Command } = require('klasa');
const snekfetch = require('snekfetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['yomama', "ym"],

			description: 'Yo momma is so fat, yo.'
		});
	}

	async run(msg) {
		const res = await request.get("http://api.yomomma.info").then(data => JSON.parse(data.text));
		const embed = new discord.MessageEmbed()
			.setColor("#e88020")
			.setTitle("📢 **Yomomma joke**")
			.setDescription(`*${res.joke}*`)
			.setTimestamp()
		return msg.channel.send(embed);
	}

};
