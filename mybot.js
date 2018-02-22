const { Client } = require('klasa');

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
sharder.spawn(2); 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

new Client({
    clientOptions: {
        fetchAllMembers: false
    },
    prefix: '-',
    cmdEditing: true,
    typing: true,
    readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`,
    console: {
      useColors: false,
    },
}).login(process.env.SECRET);
/* 
  client.BugHook = new WebhookClient(process.env.BWH_ID, process.env.BWH_TOKEN);
  client.FeatureHook = new WebhookClient(process.env.FWH_ID, process.env.FWH_TOKEN);
                                                                                    */