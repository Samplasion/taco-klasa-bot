const { Event } = require('klasa');
const snekfetch = require('snekfetch');

module.exports = class extends Event {

	run(msg) {
    snekfetch.post(`https://discordbots.org/api/bots/stats`)
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxNTA3OTcyMzc1Mjg4MjE3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE5MzE5NjI2fQ.7M0Ta5z6PUYzx5J6nvORPRKX-Sqb_O9BDepHJyP2tfg')
      .send({ server_count: this.client.guilds.size })
      .then(() => this.client.console.log('Updated discordbots.org stats.'))
      .catch(err => console.error(`Whoops something went wrong: ${err.body}`));
    setInterval(() => {
      snekfetch.post(`https://discordbots.org/api/bots/stats`)
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxNTA3OTcyMzc1Mjg4MjE3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE5MzE5NjI2fQ.7M0Ta5z6PUYzx5J6nvORPRKX-Sqb_O9BDepHJyP2tfg')
        .send({ server_count: this.client.guilds.size })
        .then(() => this.client.console.log('Updated discordbots.org stats.'))
        .catch(err => console.error(`Whoops something went wrong: ${err.body}`));
    }, 3600000)
  /*this.client.dbl.postStats(this.client.guilds.size)
    .then(() => console.log('Updated discordbots.org stats.'));
  setInterval(() => {
    this.client.dbl.postStats(this.client.guilds.size)
      .then(() => console.log('Updated discordbots.org stats.'));
  }, 1800000);*/
    const activityMessages = [`Help for ${this.client.guilds.size} total guilds`, `Help for ${this.client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`, `Help for ${this.client.channels.size.toLocaleString()} total channels`, `Type -help for a list of commands`];
    this.client.user.setActivity(activityMessages[1], {type: 0});
    setInterval(() => {
      let i = 2;
      this.client.user.setActivity(activityMessages[i], {type: 0});
      i++;
      if (i == activityMessages.length) i = 0;
    }, 300000)
	}

};