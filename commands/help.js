const { MessageEmbed } = require("discord.js");
const settings = require(`./settings.json`);


module.exports = {
    name: `help`,
    aliases: [`h`],
    
    async execute(client, message, args) {
        const helpembed = new MessageEmbed()
            .setTitle(`\`${client.user.tag}\` : Command Help`)
            .setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join(', '))
            .setColor(settings.color.ok)

        message.reply({embeds: [helpembed]})
    }
}