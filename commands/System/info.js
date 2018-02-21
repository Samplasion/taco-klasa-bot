const { Command } = require('klasa');
const snekfetch = require('snekfetch');
const { MessageAttachment, MessageEmbed, version } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['details', 'what'],
			guarded: true,
			description: 'Provides some information about this bot.'
		});
	}

	async run(msg) {
    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    const message = msg;
    const { body } = await snekfetch.get(`https://discordbots.org/api/bots/${this.client.user.id}/`);
    const prefix = message.guild ? message.guild.settings.prefix : "+"
    const embed = new MessageEmbed()
      .setColor(message.guild.me.roles.highest.color || randomColor)
      .addField(`**${this.client.user.tag}**`, `${body.shortdesc}`)
      .addField("**Library**", `${body.lib}, ver.${version}`, true)
      .addField("**Upvotes** on DBL", body.points, true)
      .addField("**Owner**", `<@${body.owners.join(">, <@")}>`, true)
      .addField("**Server Count**", body.server_count, true)
      .addField("**Useful links**", `[Support Server](https://discord.gg/${body.support}) | [DBL Page](https://discordbots.org/bot/407272032431112202)`, true)
      .setAuthor(this.client.user.username, this.client.user.avatarURL())
      .setThumbnail(`https://cdn.discordapp.com/avatars/${body.clientid}/${body.avatar}.png`)
      .setTimestamp()
      .setFooter(`${prefix}info`)
    return message.channel.send({ embed });
	}

};