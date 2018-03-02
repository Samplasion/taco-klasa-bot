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
    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
		if (msg.channel.postable === false) throw 'The selected channel is not postable.';
		return msg.channel.send(new this.client.methods.Embed()
                              .setColor(msg.guild.me.roles.highest.color || randomColor)
                              .setDescription(message)
                              .setFooter(`Requested by ${msg.member ? msg.member.displayName : msg.author.username}`, msg.author.displayAvatarURL()));
	}

};