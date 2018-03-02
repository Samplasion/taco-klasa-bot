const { Command, version: klasaVersion, Timestamp } = require('klasa');
const snekfetch = require('snekfetch');
const { version: discordVersion } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['details', 'what', "botinfo"],
			guarded: true,
			description: 'Provides some information about this bot.'
		});
    this.botVersion = "1.7"
	}

	async run(msg) {
		let [users, guilds, channels, memory] = [0, 0, 0, 0];

		if (this.client.shard) {
			const results = await this.client.shard.broadcastEval(`[this.users.size, this.guilds.size, this.channels.size, (process.memoryUsage().heapUsed / 1024 / 1024)]`);
			for (const result of results) {
				users += result[0];
				guilds += result[1];
				channels += result[2];
				memory += result[3];
			}
		}
    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    const message = msg;
    const { body } = await snekfetch.get(`https://discordbots.org/api/bots/${this.client.user.id}/`);
    const prefix = message.guild ? message.guild.configs.prefix : "+"
    const embed = new this.client.methods.Embed()
      .setColor(message.guild.me.roles.highest.color || randomColor)
/*      .addField(`**${this.client.user.tag}**`, `${body.shortdesc}`)
      .addField("**Library**", `${body.lib}, ver.${version}`, true)
      .addField("**Upvotes** on DBL", body.points, true)
      .addField("**Owner**", `<@${body.owners.join(">, <@")}>`, true)
      .addField("**Server Count**", body.server_count, true)
      .addField("**Useful links**", `[Support Server](https://discord.gg/${body.support}) | [DBL Page](https://discordbots.org/bot/407272032431112202)`, true)*/
      .setDescription(`\`\`\`asciidoc\n${msg.language.get('COMMAND_STATS',
			(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
			Timestamp.toNow(Date.now() - (process.uptime() * 1000)),
			/*(users || this.client.users.size).toLocaleString()*/this.client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
			(guilds || this.client.guilds.size).toLocaleString(),
			(channels || this.client.channels.size).toLocaleString(),
			klasaVersion, discordVersion, process.version, this.botVersion, msg
		).join("\n")}\n\`\`\``)
      .setAuthor(this.client.user.username, this.client.user.avatarURL())
      .setThumbnail(`https://cdn.discordapp.com/avatars/${body.clientid}/${body.avatar}.png`)
      .setTimestamp()
      .setFooter(`${prefix}info`)
    return message.channel.send({ embed });
	}

};