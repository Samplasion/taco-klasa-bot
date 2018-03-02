const { Command } = require('klasa');
const Jimp = require('jimp');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: 'You (or the mentioned person) are wanted',
            usage: '[user:user]',
        });
    }

    async run(msg, [user, url]) {
      let img = user ? user.avatarURL({ format: "png"}) : url ? url : msg.author.avatarURL({ format: "png"});
      Jimp.read(img).then(function(image) {
        Jimp.read("http://printmeposter.com/blog/wp-content/uploads/2016/08/A-Wanted-Poster-Template.jpg").then(function(image2) {
          image.resize(283, 283);
          image.sepia()
          image2.composite(image, 68, 217);
          image2.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            msg.channel.send({files: [{ name: 'wanted.png', attachment: buffer }] });
          });
        });
      });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};