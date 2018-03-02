const { Command } = require('klasa');
const Jimp = require('jimp');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: 'Returns the avatar',
            usage: '[user:user]',
        });
    }

    async run(msg, [user]) {
      let img = user ? user.avatarURL({ format: "png"}) : msg.author.avatarURL({ format: "png"});
      Jimp.read(img).then(function(image) {
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
          msg.channel.send({files: [{ name: 'avatar.png', attachment: buffer }] });
        });
      });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};