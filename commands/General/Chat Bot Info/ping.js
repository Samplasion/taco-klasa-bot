const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: (msg) => msg.language.get('COMMAND_PING_DESCRIPTION'),
      requiredSettings: ["prefix"],
		});
	}

	async run(msg) {
    const message = msg
    const m  = await msg.channel.send("Ping?");
    /*msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);*/
    const embed = {
      "color": message.guild.me.roles.highest.color || 1234567,
      "author": {
        "name": `${this.client.user.username}`,
        "icon_url": this.client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Latency",
          "value": `${m.createdTimestamp - msg.createdTimestamp}ms`,
          "inline": true
        },
        {
          "name": "API Latency",
          "value": `${Math.round(this.client.ping)}ms`,
          "inline": true
        }
      ]
    };
    m.edit({ embed });
    
  }

};