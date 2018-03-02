const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 600,
            description: 'Use this to suggest new features.',
            usage: '<suggestion:str{1,1024}>',
            aliases: ["idea", "feature", "suggest"],
        });
    }

    async run(msg, [bug]) {
      this.client.channels.get("414429587339083787")
        .send(new this.client.methods.Embed()
                .setTitle(`Feature Suggestion by ${msg.author.username}`)
                .setDescription(bug)
                .setTimestamp(msg.createdAt))
      msg.sendMessage(":incoming_envelope: Suggestion sent!")
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};