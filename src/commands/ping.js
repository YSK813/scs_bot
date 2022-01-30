const { MessageEmbed } = require("discord.js");
const settings = require(`./settings.json`);


module.exports = {
    name: `ping`,
    aliases: [],
    
    async execute(client, message, args) {
        message.channel.send(`\`\`\`\nWebsocket Ping : ${client.ws.ping}\n\`\`\``)
    }
}