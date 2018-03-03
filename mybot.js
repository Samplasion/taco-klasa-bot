const { Client, PermissionLevels } = require('klasa');

// ~~~~~~~~~~~~ GLITCH.COM STUFF ~~~~~~~~~~~~
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~ SHARDING STUFF ~~~~~~~~~~~~~~
/* const { ShardingManager } = require('discord.js');
const sharder = new ShardingManager(`${process.cwd()}/mybot.js`, { totalShards: 2 });
sharder.on('launch', shard => console.log(`launched ${shard.id}`));
sharder.spawn(2); */
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*const permissionLevels = new PermissionLevels()
//Optionally you can pass a number to set a custom number of permission levels. It is not advised however, as internal commands expect 10 to be the highest permission level. Modifying away from 10 without further modification of all core commands, could put your server at risk of malicious users using the core eval command.
    .addLevel(0, false, () => true)
    // everyone can use these commands
    .addLevel(2, false, (client, msg) => {
      if (!msg.guild || !msg.guild.settings.modRole) return false;
      const modRole = msg.guild.roles.get(msg.guild.settings.modRole);
      return modRole && msg.member.roles.has(modRole.id);
    })
    .addLevel(3, false, (client, msg) => {
      if (!msg.guild || !msg.guild.settings.adminRole) return false;
      const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
      return adminRole && msg.member.roles.has(adminRole.id);
    })
    .addLevel(4, false, (client, msg) => msg.guild && msg.member.permissions.has('MANAGE_GUILD'))
    // Members of guilds must have 'MANAGE_GUILD' permission
    .addLevel(5, false, (client, msg) => msg.guild && msg.author.id === msg.guild.owner.id)
    // The member using this command must be the guild owner
    // .addLevel(7, false, (client, msg) => msg.guild && msg.member === msg.guild.owner)
    .addLevel(9, true, (client, msg) => msg.author === client.owner)
    // Allows the Bot Owner to use any lower commands, and causes any command with a permission level 9 or lower to return an error if no check passes.
    .addLevel(10, false, (client, msg) => msg.author === client.owner);
    // Allows the bot owner to use Bot Owner only commands, which silently fail for other users.*/

new Client({
    clientOptions: {
        fetchAllMembers: false
    },
    prefix: '-',
    cmdEditing: true,
    typing: false,
    cmdLogging: true,
    cmdPrompt: true,
    readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${/*client.users.size*/client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`,
    console: {
      useColors: false,
    },
/*  gateways: {
      users: { provider: 'level' }
    }*/
}).login(process.env.SECRET);
/* 
  client.BugHook = new WebhookClient(process.env.BWH_ID, process.env.BWH_TOKEN);
  client.FeatureHook = new WebhookClient(process.env.FWH_ID, process.env.FWH_TOKEN);
                                                                                    */