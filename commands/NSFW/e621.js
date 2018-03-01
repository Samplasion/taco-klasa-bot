const { Command } = require('klasa');
const snek = require("snekfetch");
const parser = require('xml2json');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            nsfw: true,
            description: 'Returns a random e621 image',
        });
    }

    async run(msg, [...params]) {
      const xml = await snek.get("https://e621.net/post/index.xml?limit=1");
      const json = parser.toJson(xml.body, { object: true }); // return console.log(json.posts)
      msg.sendEmbed(new this.client.methods.Embed()
                     .setImage(json.posts.post.file_url)
                     .setFooter(`Requested by ${msg.member ? msg.member.displayName : msg.author.username} | Id : ${json.posts.post.id.$t}`, msg.author.displayAvatarURL()))
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};