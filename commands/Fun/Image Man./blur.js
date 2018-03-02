const { Command } = require('klasa');
const Jimp = require('jimp');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: 'Flips your avatar or the given image',
            usage: '[user:user] [url:url]',
        });
    }

    async run(msg, [user, url]) {
      let img = user ? user.avatarURL({ format: "png"}) : url ? url : msg.author.avatarURL({ format: "png"});
      Jimp.read(img).then(function(image) {
        image.blur(9);
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
          msg.channel.send({files: [{ name: 'blur.png', attachment: buffer }] });
        });
      });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};