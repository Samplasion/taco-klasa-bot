const { Command } = require('klasa');
const snek = require('snekfetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Trump "illegalizes" something.',
      usage: "<illegalThing:str{1,10}>"
		});
	}

	async run(msg, [illegal]) {
    /*if(illegal.includes(" ") || illegal.includes(".") || illegal.includes(",")) throw "You must only use letters."*/
    try {
      const embed = new this.client.methods.Embed()
        .setTitle("Trump has decided to make \"" + illegal.toUpperCase() + "\" illegal.")
        .setURL(`https://storage.googleapis.com/is-now-illegal.appspot.com/gifs/${encodeURIComponent(illegal.toUpperCase())}.gif`)
        .setImage(`https://storage.googleapis.com/is-now-illegal.appspot.com/gifs/${encodeURIComponent(illegal.toUpperCase())}.gif`)
        .setColor("#C5C7A2")
      return msg.sendEmbed(embed);
    } catch (e) {
      msg.sendMessage("Trump has decided not to make \"" + illegal.toUpperCase() + "\" illegal.")
    }
	}

};