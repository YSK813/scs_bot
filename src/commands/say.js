const { MessageEmbed } = require("discord.js");
const settings = require(`./settings.json`);


module.exports = {
    name: `say`,
    aliases: [],
    
    async execute(client, message, args, need_ADMINISTRATOR) {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({embeds: [need_ADMINISTRATOR]})


        const txt = args.join(` `)

        const nottxt = new MessageEmbed()
            .setTitle(`引数不足`)
            .setDescription(`文章 / 単語が不足しています。`)
            .setColor(settings.color.no)

        const maxerror = new MessageEmbed()
            .setTitle(`文字数制限`)
            .setDescription("使用可能な文字数は `2048` 文字以下です。")
            .setColor(settings.color.no)

        if(!txt) return message.reply({embeds: [nottxt]});

        if(txt.length > 2048) return message.reply({embeds: [maxerror]});


        const sayembed = new MessageEmbed()
            .setTitle(` `)
            .setDescription(txt)
            .setColor(settings.color.ok)

        message.reply({embeds: [sayembed]})
    }
}