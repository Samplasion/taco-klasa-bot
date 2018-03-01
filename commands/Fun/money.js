const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            aliases: [],
            permLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: '',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
      this.randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
      // this.provider = "json";
    }

    async run(msg, [...params]) {
      msg.sendEmbed(new this.client.methods.Embed()
                          .setColor(msg.guild.me.roles.highest.color || this.randomColor)
                          .setDescription(`${msg.member.displayName}, you've got ${msg.guild.configs.money ? msg.guild.configs.money : "$"}${msg.author.configs.money.toLocaleString()}`))
    }
  
    async points(msg, user, action) {
/*    if (!row) {
        await this.client.gateways.users.schema.add('money', { type: 'integer', configurable: false, default: 0})
      }  */
      let points = user.configs.money;
      switch (action) {
        case "add":
          points++;
          break;
        case "remove":
          Math.max(0, points--);
          break;
        case "reset":
          points = 0;
          break;
        case "get":
          msg.sendEmbed(new this.client.methods.Embed()
                          .setColor(msg.guild.me.roles.highest.color || this.randomColor)
                          .setTitle("Your Money")
                          .setDescription(`${msg.member.displayName}, you've got ${msg.guild.configs.money ? msg.guild.configs.money : "$"}${points.toLocaleString()}`))
          // msg.reply("You've got " + points + " points.")
        // no default
      }
      user.configs.money = points;
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};