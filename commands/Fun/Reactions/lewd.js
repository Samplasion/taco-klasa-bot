const { Command } = require('klasa');
let axios = require('axios');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            description: 'Lewd.',
            aliases: [],
            nsfw: true,
        });
      this.randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    }

    async run(msg) {
      const someone = msg.mentions.members.first() != undefined ? msg.mentions.members.first() : msg.member;
      this.getImage(msg, "lewd", someone)
    }
    
    async getImage(msg, type, user) {
      let res = await axios.get('https://rra.ram.moe/i/r', { params: { "type": type/*, "nsfw": true*/ } });
      let path = res.data.path.replace('/i/', '');
      const embed = new this.client.methods.Embed()
        .setColor(msg.guild.me.roles.highest.color || this.rC)
        .setTitle(`Lewd ${msg.member.displayName}`)
        .setImage(`https://cdn.ram.moe/${path}`)
      return msg.sendEmbed(embed);
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};