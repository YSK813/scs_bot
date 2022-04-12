const { MessageEmbed } = require("discord.js");
const settings = require(`./settings.json`);


module.exports = {
    name: `ping`,
    aliases: [],
    
    async execute(client, message, args) {
        const ping = new MessageEmbed()
            .setTitle(`Pong!`)
            .setDescription(`\`Websocket Ping : ${client.ws.ping}\``)
            .setColor(settings.color.ok)

        message.reply({embeds: [ping]})
    }
}