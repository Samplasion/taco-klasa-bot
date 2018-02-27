const { Command } = require('klasa');
const { inspect } = require('util');
const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [/*'ev'*/],
			permLevel: 10,
			guarded: true,
			description: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
			usage: '<expression:str>',
      extendedHelp: (msg) => msg.language.get('COMMAND_EVAL_EXTENDEDHELP')
		});
	}

	async run(msg, [code]) {
		try {
			let evaled = eval(code);
			if (evaled instanceof Promise) evaled = await evaled;
			if (typeof evaled !== 'string') evaled = inspect(evaled, { depth: 0 });
      const embed = new MessageEmbed()
        .setColor(0x10ce66)
        .setDescription(`${msg.author.username}, here are the results of the \`${msg.guild.configs.prefix}eval\` command`)
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTimestamp()
        .addField(":inbox_tray: **INPUT**", `\`\`\`js\n${code}\n\`\`\``)
        .addField(":outbox_tray: **OUTPUT**", `\`\`\`js\n${this.client.methods.util.clean(evaled)}\n\`\`\``)
        .setFooter(`${msg.guild.configs.prefix}eval`)
      return msg.channel.send(/*"js", output*/{ embed });
			// return msg.sendCode('js', this.client.methods.util.clean(evaled));
		} catch (err) {
      const errorEmbed = new this.client.methods.Embed()
        .setColor("0xE20D0D")
        .setDescription(`${msg.author.username}, something went wrong with the \`${msg.guild.configs.prefix}eval\` command`)
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTimestamp()
        .addField(":inbox_tray: **INPUT**", `\`\`\`js\n${code}\n\`\`\``)
        .addField(":outbox_tray: **OUTPUT**", `\`\`\`js\n${this.client.methods.util.clean(err)}\n\`\`\``)
        .setFooter(`${msg.guild.configs.prefix}eval`)
			if (err.stack) this.client.emit('error', err.stack);
			// return msg.sendMessage(` \`ERROR\`\n${this.client.methods.util.codeBlock('js', this.client.methods.util.clean(err))}`);
      return msg.sendEmbed(errorEmbed)
		}
	}

};