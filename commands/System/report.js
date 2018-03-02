const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 600,
            description: 'Use this to report bugs.',
            usage: '<report:str{1,1024}>',
            aliases: ["bug"],
        });
    }

    async run(msg, [bug]) {
      this.client.channels.get("414422854533251082")
        .send(new this.client.methods.Embed()
                .setTitle(`Bug Report by ${msg.author.username}`)
                .setDescription(bug)
                .setTimestamp(msg.createdAt))
      msg.sendMessage(":incoming_envelope: Bug report sent!")
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};