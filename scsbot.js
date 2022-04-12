const discord = require(`discord.js`);
const { Collection, MessageEmbed } = require(`discord.js`);
const client = new discord.Client({ intents: 32767, allowedMentions: {repliedUser: false} });
const fs = require(`fs`);
const { config } = require(`dotenv`);
const path = require(`path`);

const tokenfile = require(`./secret/token.json`);
const settings = require(`./commands/settings.json`);

client.login(tokenfile.token);


// Clinet Events : ready
client.on(`ready`, () => {
    console.log(`\nStart Bot : logined ${client.user.tag}\n\n${new Date()}`)

    setInterval(() => {
        client.user.setActivity(`${settings.prefix}help | Stress Care Server Official Bot.`)
    }, 10000) //10 Second timer
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


//[User Data] : Anti Spam
const UserMap = new Map();

// Client Events : messageCreate
client.on(`messageCreate`, async message => {
    if(message.author.bot || !message.guild) return;


    //[System] : Anti Spam
    const time = 360000

    if(UserMap.get(message.author.id)) {
        const UserData = UserMap.get(message.author.id);
        const { lastMessage, timer } = UserData;
        let difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = UserData.msgCount;

        if(difference > settings.antispam.spamtime + `000`) {
            clearTimeout(timer);
            UserData.msgCount = 1;
            UserData.lastMessage = message;

            UserData.timer = setTimeout(() => {
                UserMap.delete(message.author.id);
            }, time);
        
            UserMap.set(message.author.id, UserData);
        } else {
            msgCount++;

            if(msgCount > settings.antispam.msgcount) {
                const antispam = new MessageEmbed()
                    .setTitle(`[Anti Spam] : Warning`)
                    .setDescription(`・短時間で大量のメッセージを検知しました。\n・receiving a large number of messages in a short time.`)
                    .setColor(settings.color.no)
                    .addField(`User`, message.author.tag)

                await message.reply({embeds: [antispam]})

                const messages = [...(await message.channel.messages.fetch({
                    limit: 5,
                    before: message.id,
                })).filter(msg => msg.author.id === message.author.id).values()]

                await message.channel.bulkDelete(messages)
            } else {
                UserData.msgCount = msgCount;
                UserMap.set(message.author.id, UserData)
            }
        }
    } else {
        let fn = setTimeout(async () => {
            UserMap.delete(message.author.id)
        }, time);

        UserMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        })
    }




    //Invite Link
    const invitelink_error = new MessageEmbed()
        .setAuthor({name: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}`})
        .setTitle(`Message Error`)
        .setDescription(`本チャンネルで招待リンクを送信することはできません。`)
        .setColor(settings.color.no)

    if(message.content.match(/discord.gg/)) {
        if(!message.member.permissions.has(`ADMINISTRATOR`)) {
            if(message.channel.id === settings.invitelink.ok_ch) return;
            return message.reply({embeds: [invitelink_error]})
                .then(message.delete())            
        } else {
            return;
        }
    }


    if(!message.content.startsWith(Prefix)) return;

    const args = message.content.slice(Prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if(!cmd) return;

    //  [Administrator] : Error when insufficient authority
    const need_ADMINISTRATOR = new MessageEmbed()
        .setTitle(`権限不足`)
        .setDescription(`\`${command}\` を実行するための権限が不足しています。\n必要な権限は以下の通りです。\n\n> 管理者権限`)
        .setColor(settings.color.no)

    //  [Ban Members] : Error when insufficient authority
    const need_BAN_MEMBERS = new MessageEmbed()
        .setTitle(`権限不足`)
        .setDescription(`\`${command}\` を実行するための権限が不足しています。\n必要な権限は以下の通りです。\n\n> メンバーをBAN`)
        .setColor(settings.color.no)

    //  [Kick Members] : Error when insufficient authority
    const need_KICK_MEMBERS = new MessageEmbed()
        .setTitle(`権限不足`)
        .setDescription(`\`${command}\` を実行するための権限が不足しています。\n必要な権限は以下の通りです。\n\n> メンバーをキック`)
        .setColor(settings.color.no)

    try {
        cmd.execute(client, message, args, need_ADMINISTRATOR, need_BAN_MEMBERS, need_KICK_MEMBERS)
    } catch(e) {
        console.log(e)
        message.reply({content: `Error : \`${e}\``})
    }
})




// Client Events : guildMemberAdd
client.on(`guildMemberAdd`, member => {
    member.guild.channels.cache.forEach(ch => {
        if(ch.id === settings.ch_id.joinlog) {
            const join_msg = new MessageEmbed()
                .setTitle(`Join the Server`)
                .setDescription(` `)
                .setColor(settings.color.joinuser)
                .setThumbnail(member.user.avatarURL())
                .addField(`User Tag`, `${member.user.tag}`)
                .addField(`User ID`, `${member.user.id}`)

            ch.send({embeds :[join_msg]})
        } else {
            return;
        }
    })
})


// Client Events : guildMemberRemove
client.on(`guildMemberRemove`, member => {
    member.guild.channels.cache.forEach(ch => {
        if(ch.id === settings.ch_id.leftlog) {
            const left_msg = new MessageEmbed()
                .setTitle(`Left the server`)
                .setDescription(` `)
                .setColor(settings.color.leftuser)
                .setThumbnail(member.user.avatarURL())
                .addField(`User Tag`, `${member.user.tag}`)
                .addField(`User ID`, `${member.user.id}`)

            ch.send({embeds: [left_msg]})
        } else {
            return;
        }
    })
})