const discord = require(`discord.js`);
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const client = new Client();
const fs = require(`fs`);
const { config } = require(`dotenv`);
const path = require(`path`);

const tokenfile = require(`./secret/token.json`);
const settings = require(`./commands/settings.json`);

client.login(tokenfile.token);


// Clinet Events : ready
client.on(`ready`, () => {
    console.log(`\nStart Bot : logined ${client.user.tag}\n\n${new Date()}`)
})


client.commands = new Collection();
client.aliases = new Collection();
client.prefix = settings.prefix;
const Prefix = settings.prefix;


// Load Handler folder

fs.readdir(`./commands`, (err, files) => {
    if(err) return console.log(`コマンドが発見できませんでした。`);

    const Files = files.filter(f => f.endsWith(`.js`));

    if(Files.length <= 0) return console.log(`コマンドが発見できませんでした。`)

    Files.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`[Loaded Command] ${file}`)
        client.commands.set(cmd.name, cmd)

        if(cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})


// Client Events : message
client.on(`message`, message => {
    if(message.author.bot || !message.guild) return;

    if(!message.content.startsWith(Prefix)) return;

    const args = message.content.slice(Prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if(!cmd) return;

    //  [管理者権限] : 権限不足時のエラー
    const need_ADMINISTRATOR = new MessageEmbed()
        .setTitle(`権限不足`)
        .setDescription(`\`${command}\` を実行するための権限が不足しています。\n必要な権限は以下の通りです。\n\n> 管理者権限`)
        .setColor(settings.color.no)

    //  [メンバーをBAN] : 権限不足時のエラー
    const need_BAN_MEMBERS = new MessageEmbed()
        .setTitle(`権限不足`)
        .setDescription(`\`${command}\` を実行するための権限が不足しています。\n必要な権限は以下の通りです。\n\n> メンバーをBAN`)
        .setColor(settings.color.no)

    //  [メンバーをキック] : 権限不足時のエラー
    const need_KICK_MEMBERS = new MessageEmbed()
        .setTitle(`権限不足`)
        .setDescription(`\`${command}\` を実行するための権限が不足しています。\n必要な権限は以下の通りです。\n\n> メンバーをキック`)
        .setColor(settings.color.no)

    try {
        cmd.execute(client, message, args, need_ADMINISTRATOR, need_BAN_MEMBERS, need_KICK_MEMBERS)
    } catch(e) {
        console.log(e)
        message.channel.send(`Error : \`${e}\``)
    }
})



/*
const commandlimit = new MessageEmbed()
        .setTitle(`権限不足`)
        .setDescription(`コマンドを実行するための権限が不足しています。\n権限をお確かめの上再度お試しください。`)
        .setColor(settings.color.no)
*/