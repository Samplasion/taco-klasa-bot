const { Event } = require('klasa');
const Jimp = require('jimp');

module.exports = class extends Event {

	run(member) {
    if(member.guild.configs.welcomeOn) {
      const chan = this.client.channels.get(member.guild.configs.welcomeChannel)
      if (member.guild.configs.welcomeImage) {
        let q = member.user.tag;
        let r = member.guild.name;
        let img = member.user.displayAvatarURL({ format: "png"});
        Jimp.read(img).then(function(image) {
          Jimp.read("https://i.imgur.com/8YEW9b1.png").then(function(image2) {
            Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(function(font) {
              Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(function(font2) {
                image2.print(font, 9, 150, q);
                image2.print(font2, 151, 111, `to ${r}`);
                image.resize(128, 128);
                image2.composite(image, 2, 2);
                image2.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
                  chan.send({files: [{ name: 'welcome.png', attachment: buffer }] });
                });
              });
            });
          });
        });
      }
    }
	}

};