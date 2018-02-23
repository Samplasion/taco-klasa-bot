const { Command } = require('klasa');
const snek = require('snekfetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Grabs a random cat image.',
      usage: "<illegalThing:str{1,10}>"
		});
	}

	async run(msg, [illegal]) {
		return msg.channel.sendFile(`https://storage.googleapis.com/is-now-illegal.appspot.com/gifs/${illegal.toUpperCase()}.gif`, `${illegal.toUpperCase()}.gif`)
      .catch(msg.sendMessage("Trump has decided not to make \"" + illegal.toUpperCase() + "\"illegal."));
	}

};