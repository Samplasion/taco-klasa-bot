const { Command } = require('klasa');
const Jimp = require('jimp');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: '"Magik"s your avatar or the avatar of the @mentioned person',
            usage: '[user:user] [url:url]',
        });
    }

    async run(msg, [user, url]) {
      let img = user ? user.avatarURL({ format: "png"}) : url ? url : msg.author.avatarURL({ format: "png"});
      Jimp.read(`https://discord.services/api/magik?url=${img}`).then(function(image) {
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
          msg.channel.send({files: [{ name: 'magik.png', attachment: buffer }] });
        });
      });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};