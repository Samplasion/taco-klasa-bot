const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: ["nick", "botnick"],
            permLevel: 10,
            botPerms: [],
            requiredSettings: [],
            description: 'Sets the bot\'s nickname',
            quotedStringSupport: false,
            usage: '<nick:str{1,32}>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(msg, [nick]) {
      const display = new this.client.methods.Embed()
        .setColor(msg.guild.me.roles.highest.color || 0x673AB7)
//      .setAuthor(this.client.user.username, this.client.user.avatarURL())
        .setTitle('Nickname change')
        .setDescription(`Do you really want to change the nickname to ${nick}?`)
      const done = new this.client.methods.Embed()
        .setColor(msg.guild.me.roles.highest.color || 0x673AB7)
//      .setAuthor(this.client.user.username, this.client.user.avatarURL())
        .setTitle('Nickname change')
      const prompt = await msg.prompt(display)
      if(prompt) {
        await msg.guild.me.setNickname(nick)
        return msg.sendEmbed(done.setDescription(`Changed the nickname to ${nick}`));
      }
      return msg.sendEmbed(done.setDescription(`Succesfully canceled.`))
      msg.channel.send("<:dblMod:401724520806875139>")
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};