const { Command } = require('klasa');
const Jimp = require('jimp');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: 'Applies the "gay" effect to an image',
            usage: '[user:user] [url:url]',
        });
    }

    async run(msg, [user, url]) {
      let img = user ? user.avatarURL({ format: "png"}) : url ? url : msg.author.avatarURL({ format: "png"});
      Jimp.read(img).then(function(image) {
        Jimp.read("https://cdn.glitch.com/8c009d94-1f7e-464c-82c2-bccaf15cb6cd%2Fgay.png?1520010590279").then(function(image2) {
          image.resize(768, 768);
          image2.fade(0.6);
          image.composite(image2, 0, 0);
          image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            msg.channel.send({files: [{ name: 'gay.png', attachment: buffer }] });
          });
        });
      });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};