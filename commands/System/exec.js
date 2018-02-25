const { Command, util } = require('klasa');
const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permLevel: 10,

			description: 'Execute commands in the terminal, use with EXTREME CAUTION.',
			usage: '<expression:str>'
		});
	}

	async run(msg, [input]) {
		const result = await util.exec(input).catch((err) => { throw err; });

		const output = result.stdout ? `**\`OUTPUT\`**${util.codeBlock('sh', result.stdout)}` : '';
		const outerr = result.stderr ? `**\`ERROR\`**${util.codeBlock('sh', result.stderr)}` : '';
    if (output.length > 1024) {
      return msg.channel.send(new MessageAttachment(Buffer.from(output), "output.txt"));
    }
    if (outerr.length > 1024) {
      return msg.channel.send(new MessageAttachment(Buffer.from(outerr), "outerr.txt"));
    }
		return msg.send([output, outerr].join('\n'));
	}

};