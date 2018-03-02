const { Command } = require('klasa');
const Jimp = require('jimp');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: 'Inverts your avatar or the avatar of the @mentioned person',
            usage: '[user:user] [url:url]',
            permLevel: 10,
        });
    }

    async run(msg, [user, url]) {
      let img = user ? user.avatarURL({ format: "png"}) : url ? url : msg.author.avatarURL({ format: "png"});
      Jimp.read(img).then(function(image) {
        image.resize(1280, 720);
        Jimp.read("https://github.com/TannerReynolds/Havana/blob/master/img/odyssey.png?raw=true").then(function(image2) {
          image.composite(image2, 0, 0);
          image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            msg.channel.send({files: [{ name: 'odyssey.png', attachment: buffer }] });
          });
        });
      });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};