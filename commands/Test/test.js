const { Command, RichDisplay } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: '',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
      this.images = [
          'https://i.imgur.com/gh3vYgj.jpg',
          'https://i.imgur.com/vBV81m4.jpg',
          'https://i.imgur.com/92hAsqe.jpg'
      ];
    }

    async run(msg, [...params]) {
        /*return new RichDisplay()
            .addPage(new this.client.methods.Embed().setDescription('First page'))
            .addPage(new this.client.methods.Embed().setDescription('Second page'))
            .addPage(new this.client.methods.Embed().setDescription('Third page'))
            .run(await msg.sendMessage('Loading...'));*/
        const display = new RichDisplay(new this.client.methods.Embed()
            .setColor(0x673AB7)
            .setAuthor(this.client.user.username, this.client.user.avatarURL())
            .setTitle('Norway Pictures Slideshow')
            .setDescription('Scroll between the images using the provided reaction emotes.')
        );

        for (let i = 0; i < this.images.length; i++) {
            display.addPage(template => template.setImage(this.images[i]));
        }

        return display.run(await msg.sendMessage('Loading slideshow...'));
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};