const { Command } = require('klasa');
const { inspect } = require('util');
const { MessageAttachment, MessageEmbed } = require("discord.js");
const seval = require("safe-eval")

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ev'],
			permLevel: 0,
			guarded: true,
			description: 'Solves a math expreession.',
			usage: '<expression:str>'
		});
	}

	async run(msg, [code]) {
		try {
			let evaled = seval(code);
			if (evaled instanceof Promise) evaled = await evaled;
			// if (typeof evaled !== 'string') evaled = inspect(evaled, { depth: 0 });
      const embed = new MessageEmbed()
        .setColor(0x10ce66)
        .setDescription(`${msg.author.username}, here are the results of the \`${msg.guild.configs.prefix}solve\` command`)
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTimestamp()
        .addField(":inbox_tray: **INPUT**", `\`\`\`js\n${code}\n\`\`\``)
        .addField(":outbox_tray: **OUTPUT**", `\`\`\`js\n${this.client.methods.util.clean(evaled)}\n\`\`\``)
        .setFooter(`${msg.guild.configs.prefix}solve`)
      return msg.channel.send(/*"js", output*/{ embed });
			// return msg.sendCode('js', this.client.methods.util.clean(evaled));
		} catch (err) {
      const errorEmbed = new this.client.methods.Embed()
        .setColor("0xE20D0D")
        .setDescription(`${msg.author.username}, something went wrong with the \`${msg.guild.configs.prefix}solve\` command`)
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTimestamp()
        .addField(":inbox_tray: **INPUT**", `\`\`\`js\n${code}\n\`\`\``)
        .addField(":outbox_tray: **OUTPUT**", `\`\`\`js\n${this.client.methods.util.clean(err)}\n\`\`\``)
        .setFooter(`${msg.guild.configs.prefix}solve`)
			if (err.stack) this.client.emit('error', err.stack);
			// return msg.sendMessage(` \`ERROR\`\n${this.client.methods.util.codeBlock('js', this.client.methods.util.clean(err))}`);
      return msg.sendEmbed(errorEmbed)
		}
	}

};