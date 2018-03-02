const { Command } = require('klasa');
const Jimp = require('jimp');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: 'Someone stepped in you (so in shit)',
            aliases: ["poo", "ew"],
            usage: '[user:user] [url:url]',
        });
    }

    async run(msg, [user, url]) {
      let img = user ? user.avatarURL({ format: "png"}) : url ? url : msg.author.avatarURL({ format: "png"});
      Jimp.read(img).then(function(image) {
        Jimp.read("https://cdn.glitch.com/8c009d94-1f7e-464c-82c2-bccaf15cb6cd%2Fshit.png?1519997151120").then(function(image2) {
          image.resize(76, 76);
          image2.composite(image, 266, 730);
          image2.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            msg.channel.send({files: [{ name: 'shit.png', attachment: buffer }] });
          });
        });
      });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};