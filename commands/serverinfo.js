const { MessageEmbed } = require("discord.js");
const settings = require(`./settings.json`);


module.exports = {
    name: `serverinfo`,
    aliases: [`si`],
    
    async execute(client, message, args) {
        const serverinfo = new MessageEmbed()
            .setTitle(`Server Infomation`)
            .setDescription(` `)
            .setColor(settings.color.ok)
            .setThumbnail(message.guild.iconURL())
            .addField(`Guild Name`, message.guild.name, true)
            .addField(`Guild ID`, message.guild.id, true)

        message.reply({embeds: [serverinfo]})
    }
}