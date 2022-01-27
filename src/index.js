const discord = require(`discord.js`)
const client = new discord.Client()

const tokenfile = require(`./secret/token.json`)

client.login(tokenfile.token)


client.on(`ready`, () => {
    console.log(`Start Bot : logined ${client.user.bot}`)
})

client.on(`message`, message => {
    if(message.content === `ping`) {
        message.channel.send(client.ws.ping)
    }
})