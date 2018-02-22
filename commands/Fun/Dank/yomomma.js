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
		const res = await snekfetch.get("http://api.yomomma.info").then(data => JSON.parse(data.text));
		const embed = new this.client.methods.Embed()
			.setColor("#e88020")
			.setTitle("📢 **Yomomma joke**")
			.setDescription(`*${res.joke}*`)
			.setTimestamp()
		return msg.sendEmbed(embed);
	}

};
