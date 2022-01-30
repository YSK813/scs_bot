# SCS Bot (Stress Care Server Bot)

![Bot Icon](/picture/SCSbot_icon.png)


# Developer  
Discord : YSK#7011  
Twitter : [@YSK__0813](https://twitter.com/YSK__0813)  
Support : [Discord Server](https://discord.gg/scHkEmcrwR)  



# Discord.js Version used  
[Discord.js : 12.5.3  ](https://github.com/discordjs/discord.js/releases/tag/12.5.3)



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
    "prefix": ".",
    "color": {
        "ok": "#00ff95",
        "no": "#ff0000"
    }
}
```  
- "prefix" : This is Set Bot command prefix.
- "color" : Embed color in your Bot.
  - "ok" : If Process success
  - "no" : If Process Error



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