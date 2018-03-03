const { Command } = require('klasa');
const Jimp = require('jimp');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: 'My boss likes to get inspired by me',
            usage: '[user:user] [url:url]',
        });
    }

    async run(msg, [user, url]) {
      let img = user ? user.avatarURL({ format: "png"}) : url ? url : msg.author.avatarURL({ format: "png"});
      Jimp.read(img).then(function(image) {
        Jimp.read("https://i.imgur.com/ZHBhe9W.png").then(function(image2) {
          image.resize(706, 597);
          image2.composite(image, 22, 129);
          image2.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            msg.channel.send({files: [{ name: 'inspirational.png', attachment: buffer }] });
          });
        });
      });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};