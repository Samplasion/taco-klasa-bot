const { Command } = require('klasa');
const discord = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            cooldown: 0,
            aliases: [],
            permLevel: 0,
            botPerms: [],
            requiredSettings: [],
            description: 'Searches on Google and returns the search results.',
            usage: '<searchQuery:str>',
            usageDelim: undefined,
        });
    }

    async run(msg, [params]) {
      // The modules we are using are cheerio, snekfetch, and querystring.
      const cheerio = require('cheerio'),
            snekfetch = require('snekfetch'),
            querystring = require('querystring');
      // Depending on your command framework (or if you use one), it doesn't have to
      // edit messages so you can rework it to fit your needs. Again, this doesn't have
      // to be async if you don't care about message editing.
      async function googleCommand(msg, args) {

         // These are our two variables. One of them creates a message while we preform a search,
         // the other generates a URL for our crawler.
         let searchMessage = await msg.reply('searching...');
         let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(params)}`;

         // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
         // utilize that for our try/catch block.
         return snekfetch.get(searchUrl).then((result) => {

            // Cheerio lets us parse the HTML on our google result to grab the URL.
            let $ = cheerio.load(result.text);

            // This is allowing us to grab the URL from within the instance of the page (HTML)
            let googleData = $('.r').first().find('a').first().attr('href');
            let googleText = $('.r').first().find('a').first().text();

            // Now that we have our data from Google, we can send it to the channel.
            googleData = querystring.parse(googleData.replace('/url?', ''));
           // This is allowing us to grab the URL from within the instance of the page (HTML)
            let seeAlso1 = $('.r').eq(1).find('a').first().attr('href');

            // Now that we have our data from Google, we can send it to the channel.
            seeAlso1 = querystring.parse(seeAlso1.replace('/url?', ''));
           // This is allowing us to grab the URL from within the instance of the page (HTML)
            let seeAlso2 = $('.r').eq(2).find('a').first().attr('href');

            // Now that we have our data from Google, we can send it to the channel.
            seeAlso2 = querystring.parse(seeAlso2.replace('/url?', ''));
            searchMessage.edit(/*`Result found!\n${googleData.q}`*/`${googleText}\n${googleData.q}\n\n__**See also:**__\n\n- ${$('.r').eq(1).find("a").first().text()}\n${seeAlso1.q}\n\n- ${$('.r').eq(2).find("a").first().text()}\n${seeAlso2.q}`);

        // If no results are found, we catch it and return 'No results are found!'
        }).catch((err) => {
           searchMessage.edit('No results found!');
        });
      }
      googleCommand(msg, params)
    }

    async init() {
        // You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
    }

};