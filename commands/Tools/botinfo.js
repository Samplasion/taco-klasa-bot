const { Command } = require('klasa');
const snekfetch = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            // name: 'yourCommandName',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 5,
            aliases: [],
            permLevel: 0,
            requiredSettings: [],
            description: 'Shows the bot\'s info',
            usage: '<dbl|blspace> <user:mention>',
            usageDelim: " ",
            extendedHelp: 'No extended help available.'
        });
      this.randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    }

    async run(msg, [command]) {
      const bot = msg.mentions.members.first();
      if (!bot.user.bot) return msg.reply(`the user you mentioned, ${bot/*.user.username*/.displayName}, is not a bot! Please retry.`)
      switch (command) {
        case "dbl": this.dbl(msg, bot); break;
        case "blspace": this.blspace(msg, bot); break;
      }
    }
  
    async dbl(message, bot) {
      const { body } = await snekfetch.get(`https://discordbots.org/api/bots/${bot.user.id}/`)
        // .catch(message.reply("something went wrong. Please retry."));
      const links   = [],
            nolinks = [];
      body.invite ? links.push(`[Invite Link](${body.invite})`) : links.push(`[Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=${body.id}&permissions=0&scope=bot)`);
      body.support ? links.push(`[Support Server](https://discord.gg/${body.support})`) : nolinks.push("");
      body.github ? links.push(`[GitHub Repo](${body.github})`) : nolinks.push("");
      body.website ? links.push(`[Website](${body.website})`) : nolinks.push("");
      links.push(`[DBL Page](https://discordbots.org/bot/${bot.user.id})`)
      // console.log(body)
      const prefix = message.guild ? message.guild.configs.prefix : "-";
      const embed = new this.client.methods.Embed()
        .setColor(message.guild.me.roles.highest.color || this.randomColor)
        .addField(`**${body.username}#${body.discriminator}**`, `${body.shortdesc}`)
        .addField("**Library**", `${body.lib}`, true)
        .addField("**Upvotes**", body.points, true)
        .addField(body.owners.length < 2 ? "**Owner**" : "**Owners**", `<@${body.owners.join(">, <@")}>`, true)
        .addField("**Server Count**", body.server_count != undefined ? body.server_count : "No server count", true)
        .addField("**Prefix**", `${body.prefix}`, true)
        .addField("**Certified**", body.certifiedBot ? ":white_check_mark: Yes" : ":negative_squared_cross_mark: No", true)
        .addField("**Shards**", `${body.shards.length != 0 ? body.shards : "No shards"}`, true)
        .addField("**Tags**", `${body.tags.length != 0 ? body.tags.join(", ") : "No tags"}`, true)
        .addField("**Useful links**", `${links.join(" | ")}`, true)
        .setAuthor(this.client.user.username, this.client.user.avatarURL())
        .setThumbnail(`https://cdn.discordapp.com/avatars/${body.clientid}/${body.avatar}.png`)
        .setTimestamp()
        .setFooter(`${prefix}botinfo`)
      return message.sendEmbed(embed);
    }
  
    async blspace(msg, bot) {
      // https://botlist.space/api/bots/${bot.user.id}
      const { body } = await snekfetch.get(`https://botlist.space/api/bots/${bot.user.id}`)
        // .catch(msg.reply("something went wrong. Please retry."));
      const links   = [],
            nolinks = [];
      body.invite ? links.push(`[Invite Link](${body.invite})`) : links.push(`[Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=${body.id}&permissions=0&scope=bot)`);
      body.support ? links.push(`[Support Server](https://discord.gg/${body.support})`) : nolinks.push("");
      body.github ? links.push(`[GitHub Repo](${body.github})`) : nolinks.push("");
      body.website ? links.push(`[Website](${body.website})`) : nolinks.push("");
      links.push(`[BotList.space Page](https://botlist.space/view/${bot.user.id})`)
      // console.log(body)
      let owners = [];
      for (var i = 0; i < body.owners.length; i++) {
        owners.push(body.owners[i].id)
      }
      /* body.owners.map(owner => {
        owner.id
      }).join(">, <@");*/
      const prefix = msg.guild ? msg.guild.configs.prefix : "-";
      const embed = new this.client.methods.Embed()
        .setColor(msg.guild.me.roles.highest.color || this.randomColor)
        .addField(`**${body.name}#${body.discriminator}**`, `${body.shortDesc}`)
        .addField("**Library**", `${body.library}`, true)
        .addField("**Views**", body.views, true)
        .addField(body.owners.length < 2 ? "**Owner**" : "**Owners**", `<@${owners.join(">, <@")}>`, true)
        .addField("**Server Count**", body.server_count != undefined ? body.server_count : "No server count", true)
        .addField("**Prefix**", `${body.prefix}`, true)
        .addField("**Approved**", body.approved ? ":white_check_mark: Yes" : ":negative_squared_cross_mark: No", true)
        .addField("**Featured**", body.featured ? ":white_check_mark: Yes" : ":negative_squared_cross_mark: No", true)
        // .addField("**Shards**", `${body.shards.length != 0 ? body.shards : "No shards"}`, true)
        // .addField("**Tags**", `${body.tags.length != 0 ? body.tags.join(", ") : "No tags"}`, true)
        .addField("**Useful links**", `${links.join(" | ")}`, true)
        .setAuthor(this.client.user.username, this.client.user.avatarURL())
        .setThumbnail(`https://cdn.discordapp.com/avatars/${body.id}/${body.avatar}.png`)
        .setTimestamp()
        .setFooter(`${prefix}botinfo`)
      return msg.sendEmbed(embed);
      msg.sendMessage("Work in progress...")
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};