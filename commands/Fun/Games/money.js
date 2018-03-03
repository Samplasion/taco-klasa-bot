const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            aliases: ["bal", "balance"],
            enabled: true,
            runIn: ['text'],
            description: 'How many of dem monies you have?',
        });
      this.randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
      // this.provider = "json";
    }

    async run(msg, [...params]) {
      msg.sendEmbed(new this.client.methods.Embed()
                          .setColor(msg.guild.me.roles.highest.color || this.randomColor)
                          .setAuthor(msg.member.displayName, msg.author.displayAvatarURL())
                          .setTitle("Balance")
                          .setDescription(`${msg.member.displayName}, you've got ${msg.guild.configs.money}${msg.author.configs.money.toLocaleString()}`))
      msg.author.configs.update("money", msg.author.configs.money)
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};