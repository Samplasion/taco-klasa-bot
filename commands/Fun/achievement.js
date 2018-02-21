const { Command } = require('klasa');
const snekfetch = require('snekfetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: ["mca"],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Sends a Minecraft Achievement message',
            quotedStringSupport: false,
            usage: '<title:str{1,22}> [subtitle:str{1,22}]',
            usageDelim: " ",
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [...params]) {
        let [title, contents] = params
        if(!contents) {
          [title, contents] = ["Achievement Get!", title];
        }
        let rnd = Math.floor((Math.random() * 39) + 1);
        if(contents.toLowerCase().includes("burn") || title.toLowerCase().includes("burn")) rnd = 38;
        if(contents.toLowerCase().includes("cookie") || title.toLowerCase().includes("cookie")) rnd = 21;
        if(contents.toLowerCase().includes("cake") || title.toLowerCase().includes("cake")) rnd = 10;

        const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
        snekfetch.get(url)
         .then(r=>msg.channel.send("", {files:[{attachment: r.body}]}));
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};