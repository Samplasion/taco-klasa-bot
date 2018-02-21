const { Command } = require('klasa');
const HTMLParser = require('fast-html-parser');
const snekfetch = require('snekfetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Grabs random \'Fuck My Life\' quote from the web.' });
	}

	async run(msg) {
		/*
		const { text: html } = await snekfetch.get('http://www.fmylife.com/random');
		const root = HTMLParser.parse(html);
		const article = root.querySelector('.block a');
		return msg.send(article.text);
		*/
		const { text: html } = await snekfetch.get("http://www.fmylife.com/random");
		const root = HTMLParser.parse(html);
		const article = root.querySelector(".block a");
		const upvotes = root.querySelector(".vote-up");
		const downvotes = root.querySelector(".vote-down");
		const embed = new discord.MessageEmbed()
			.setColor([0, 173, 230])
			.setDescription(`**${article.text}**`)
			.setThumbnail("https://lh3.googleusercontent.com/fjs43qbdGjdNVlhDF1RvTC6q0T5gAxVFsmq_3_msZjdW8g6wsWABTJHRdo6HEexevW4=w300")
			.setTimestamp()
			.setAuthor("FML", "https://lh3.googleusercontent.com/fjs43qbdGjdNVlhDF1RvTC6q0T5gAxVFsmq_3_msZjdW8g6wsWABTJHRdo6HEexevW4=w300")
			.addField("**I agree, your life sucks**", upvotes.text, true)
			.addField("**You deserved it**", downvotes.text, true)
	}

};
