const { Command } = require('klasa');
const moment = require('moment');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ["serverinfo", "guildinfo", "server", 'guild'],
			description: 'Get information on the current server.',
      usage: "[emojis|roles|role-ids]"
		});
		this.verificationLevels = [
			'None',
			'Low',
			'Medium',
			'(╯°□°）╯︵ ┻━┻',
			'┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
		];

		this.filterLevels = [
			'Off',
			'No Role',
			'Everyone'
		];
	}

	async run(msg, [command]) {
    switch (command) {
    case "emoji":
    case "emojis":
    case "emotes":
      const emojiInfo = new this.client.methods.Embed()
        .setColor(0x00AE86)
        .setTitle("**Guild emojis**")
        .setDescription(msg.guild.emojis.map(e => `${e.toString()}`).join(' '))
      // msg.channel.send(`**Guild emojis**:\n${msg.guild.emojis.map(e => `${e.toString()}`).join(' ')}`)
      msg.sendEmbed(emojiInfo);
      break;
    case "role":
    case "roles":
      msg.channel.send(`**Server roles**:\n${msg.guild.roles.map(g=>`- \`${g.name}\``).sort().join('\n')}`)
      break;
    case "role-ids":
      msg.channel.send(`**Server roles**:\n${msg.guild.roles.map(g=>`- \`${g.name} (${g.id})\``).sort().join('\n')}`)
      break;
    default:
      const serverInfo = new this.client.methods.Embed()
        .setColor(0x00AE86)
        .setThumbnail(msg.guild.iconURL())
        .addField('❯ Name', msg.guild.name, true)
        .addField('❯ ID', msg.guild.id, true)
        .addField('❯ Creation Date', moment(msg.guild.createdAt).format('MMMM Do YYYY'), true)
        .addField('❯ Region', msg.guild.region, true)
        .addField('❯ Explicit Filter', this.filterLevels[msg.guild.explicitContentFilter], true)
        .addField('❯ Verification Level', this.verificationLevels[msg.guild.verificationLevel], true)
        .addField('❯ Owner', msg.guild.owner ? msg.guild.owner.user.tag : 'None', true)
        .addField('❯ Members', msg.guild.memberCount, true)
        .addField('❯ Roles', msg.guild.roles.map(r => r.name).join(", "), true)
        .addField('❯ Emojis', msg.guild.emojis.map(e => `${e.toString()}`).join(" "), true)
//        .addField(msg.guild.emojis.map(e => `${e.toString()}`).join(' '))
      return msg.sendEmbed(serverInfo);
    }
	}

};