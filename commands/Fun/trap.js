const { Command } = require('klasa');
const Canvas = require('canvas');
const { get } = require('snekfetch');

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
            description: 'Trap your friends with a Trap Card!',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg) {
      const { Image } = Canvas;
      const canvas = Canvas.createCanvas(316, 480);
      const ctx = canvas.getContext('2d');
      let base = new Image();
      let userPicture = new Image();
      try {
        base.src = await this.readFileAsync('./materials/pictures/trap.png');
      } catch (error) {
        return msg.channel.send('Something went wrong while reading a file! try again and if the error still happens contact my owner!');
      }
      let avatar;
      if (msg.mentions.users.size > 0) {
        avatar = msg.mentions.users.first().displayAvatarURL;
        if (!msg.mentions.users.first().avatarURL) avatar = undefined;
      } else {
        avatar = msg.author.displayAvatarURL;
        if (!msg.author.avatarURL) avatar = undefined;
      }
      if (avatar) {
        avatar = avatar.split('.');
        avatar = `${avatar[0]}.${avatar[1]}.${avatar[2]}.png?size=2048`;
      } else {
        avatar = 'https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png?size=2048';
      }
      const result = await get(avatar);
      userPicture.src = result.body;
      ctx.drawImage(base, 0, 0, base.width, base.height);
      ctx.rotate(-0.15);
      ctx.drawImage(userPicture, 20, 45, 124, 124);
      await msg.channel.send({
        files: [
          {
            attachment: canvas.toBuffer(),
            name: 'trap.png'
          }
        ]
      });
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};