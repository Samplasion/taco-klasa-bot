const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permLevel: 0,
			runIn: ['text'],

			description: 'Send a message through the bot.',
			usage: '<message:string>',
			usageDelim: ''
		});
	}

	async run(msg, [message]) {
		if (msg.channel.postable === false) throw 'The selected channel is not postable.';
		return msg.channel.send(new this.client.methods.Embed().setDescription(message).setFooter(`Requested by ${msg.member ? msg.member.displayName : msg.author.username}`, msg.author.displayAvatarURL()));
	}

};