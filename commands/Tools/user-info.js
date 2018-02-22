const { Command } = require('klasa');
const moment = require('moment');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Get information on a mentioned user.',
			usage: '[Member:member]',
      aliases: ["uinfo", "userinfo"]
		});
		this.statuses = {
			online: ':green_heart: Online',
			idle: ':yellow_heart: Idle',
			dnd: ':heart: Do Not Disturb',
			offline: ':broken_heart: Offline'
		};
	}

	async run(msg, [mentioned]) {
		const member = mentioned || msg.member;
		const userInfo = new this.client.methods.Embed()
			.setColor(member.displayHexColor || 0)
			.setThumbnail(member.user.displayAvatarURL())
			.addField('❯ Name', member.user.tag, true)
			.addField('❯ ID', member.id, true)
			.addField('❯ Discord Join Date', moment(member.user.createdAt).format('MMMM Do YYYY'), true)
			.addField('❯ Server Join Date', moment(member.joinedTimestamp).format('MMMM Do YYYY'), true)
			.addField('❯ Status', this.statuses[member.user.presence.status], true)
			.addField('❯ Playing', member.user.presence.activity ? member.user.presence.activity.name : 'N/A', true)
			.addField('❯ Roles', /*member.highestRole.name !== '@everyone' ? member.highestRole.name : 'None'*/ member.roles.filter(r => r.id !== msg.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles", true)
			.addField('❯ Hoist Role', member.hoistRole ? member.hoistRole.name : 'None', true);
		return msg.sendEmbed(userInfo);
	}

};