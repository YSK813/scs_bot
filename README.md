# The support of this project has ended. If you have anything, please come to [this server](https://yskblog.work/yskserver).


# SCS Bot (Stress Care Server Bot)

![Bot Icon](/picture/SCSbot_icon.png)


# Developer  
Discord : YSK#7011  
Twitter : [@YSK__0813](https://twitter.com/YSK__0813)  
Support : [Discord Server](https://discord.gg/scHkEmcrwR)  

#### If you find a bug, please report it to the support server.



# Discord.js Version used  
[Discord.js : 13.6.0  ](https://github.com/discordjs/discord.js/releases/tag/13.6.0)



# Install and used.  
1.Get your bot TOKEN.  
2.`[Run Command]` : `git clone https://github.com/YSK813/scs_bot.git`  
3.Create `secret` folder and `secret/token.json` files.  
4.Put TOKEN into `./src/secret/token.json`  
5.`[Run Command]` : `npm install`  
6.`[Bot Run Command]` : `node scsbot.js`  



# `src/secret/token.json` description.
```json
{
    "token": "xxx"
}
```
Please replace `xxx` your bot token.



# `src/commands/settings.json` description.
```json
{
    "prefix": "sc!",
    "color": {
        "ok": "#00ff95",
        "no": "#ff0000",
        "joinuser": "#32ff32",
        "leftuser": "#ff3232"
    },
    "ch_id": {
        "joinlog": "961894577533497374",
        "leftlog": "961894577533497374"
    }
}
```  
- "prefix" : This is Set Bot command prefix.
- "color" : Embed color in your Bot.
  - "ok" : If process success.
  - "no" : If process error.
  - "joinuser" : Embed message color when user server joins.
  - "leftuser" : Embed message color when user server leaves.
- "ch_id" : This is any log channel ID.
  - "joinlog" : Member join guild log channel id.
  - "leftlog" : Member join left log channel id.



# Command file description.
```js
const { MessageEmbed } = require("discord.js"); //Load MessageEmbed in discord.js
const settings = require(`./settings.json`); //Load setting.json file.


module.exports = {
    name: `help`, //Command Name
    aliases: [`h`], //Command aliases
    
    async execute(client, message, args) {
      //Process write part
    }
}
```



# Code description when a user joins and leaves the server
```js
// Joined
client.on(`guildMemberAdd`, member => {
    member.guild.channels.cache.forEach(ch => {
        if(ch.id === settings.ch_id.joinlog) {
            const join_msg = new MessageEmbed()
                .setTitle(`Join the Server`) // Embed Title
                .setDescription(`User : ${member.user.tag} (**${member.user.id}**)`) // Embed Description
                .setColor(settings.color.joinuser) // Embed Color

            ch.send(join_msg) // Embed message send channel.
        } else {
            return; // Ignore if channel not found on server
        }
    })
})


// Leaves
client.on(`guildMemberRemove`, member => {
    member.guild.channels.cache.forEach(ch => {
        if(ch.id === settings.ch_id.leftlog) {
            const left_msg = new MessageEmbed()
                .setTitle(`Left the server`) // Embed Title
                .setDescription(`User : ${member.user.tag} (**${member.user.id}**)`) // Embed Description
                .setColor(settings.color.leftuser) // Embed Color

            ch.send(left_msg) // Embed message send channel.
        } else {
            return; // Ignore if channel not found on server
        }
    })
})
```



# Options for sending messages when members join and leave [Discord.js normal functions]
```
[User Mention]
- `<${member.user.id}>`


[User Tag]
- `${member.user.tag}`


[User ID]
- `${member.user.id}`


[User Icon]
- `${member.user.avatarURL()}`
```
#### Please use the contents of the single quotation.
