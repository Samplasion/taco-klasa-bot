const { Command } = require('klasa');
const Jimp = require('jimp');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: 'Welcomes someone',
            usage: '[user:user]',
        });
    }

    async run(msg, [user]) {
      let q = user ? user.tag : msg.author.tag
      let img = user ? user.avatarURL({ format: "png"}) : msg.author.avatarURL({ format: "png"});
      Jimp.read(img).then(function(image) {
        Jimp.read("https://i.imgur.com/8YEW9b1.png").then(function(image2) {
          Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(function(font) {
            image2.print(font, 9, 150, q);
            image.resize(128, 128);
            image2.composite(image, 2, 2);
            image2.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
              msg.channel.send({files: [{ name: 'welcome.png', attachment: buffer }] });
            });
          });
        });
      });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};