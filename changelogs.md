# Change logs

## Releases Version 3.0.0
```
+ Added various things to the log when users join and unsubscribe.  
(`User tag`, `User id`, `User icon Picture`)
+ Bug fix.
```


## Big Update!
+ This version supports `discord.js v13`!



## `Discord.js v13` : Change logs
+ Client Events: `message` has been changed to `messageCreate`  
The `message` event has been deprecated.

+ `Client Intents` are now mandatory.
```js
const client = new discord.Client({ intents: 32767, allowedMentions: {repliedUser: false} });
```
> ・`intents: 32767` is all intents.  
> ・allowedMentions: You can set whether to mention when `Message#reply`.  
`true`: Can mentions.  
`false`: Can't mentions.

+ `channel.send(embed)` is no longer available.  
If you want to it, you need to change it to `channel.send({embeds: [embed]})`.
If you use `channel.send(embed)`, you will get the error:  
```js
DiscordAPIError: Cannot send an empty message
```