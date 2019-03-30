const Discord = require('discord.js')
const client = new Discord.Client(
  {
    disabledEvents: ["TYPING_START"],
    disableEveryone: true,
    messageCacheMaxSize: 100,
    messageCacheLifetime: 240,
    messageSweepInterval: 300
  });
require('dotenv').config()
const prefix = process.env.prefix;
const token = process.env.token;
const giphyToken = process.env.giphyToken;
const colors = require('./colours.json')
const GiphyApiClient = require('giphy-js-sdk-core')



client.on('ready', () => {
  console.log('Bot is ready...')
  client.user.setStatus('I am better than you!')
  client.user.setActivity('Making memes', { type: "STREAMING" })
})
  .on("disconnect", async () => console.log(client.user.username + " is disconnecting..."))
  .on("reconnecting", async () => console.log(client.user.username + "Bot reconnecting..."))
  .on("error", async err => console.log("Client error: " + err))
  .on("warn", async info => console.log("Client warning: " + info))
  .on("message", message => {
    if (message.author.bot || message.channel.type === "dm") return

    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    if (cmd === prefix + "hello") {
      giphy = GiphyApiClient(giphyToken)
      giphy.search('gifs', { "q": "fail" }).then((response) => {
        return message.channel.send('pong!' + "Your ping is: " + client.ping, {
          files: [Response.data[Math.floor((Math.random() * 10) + 1) % response.data.length].images.fixed_height.url]
        }).catch(() => {
          message.channel.send("Error")
        })
      })
    }

    if (cmd === prefix + "Info") {
      let embed = new Discord.RichEmbed()
      .setColor(colors.blueviolet)
      .setTitle("UserInfo")
      .setAuthor(message.guild.name + " Info", message.guild.iconURL)
      .setThumbnail(message.guild.iconURL)
      .addField("**Guild Name:**", message.guild.name, true)
      .addField("**Guild Owner:**", message.guild.owner, true)
      .addField("**Member Count:**", message.guild.memberCount, true)
      .addField("**Role Count:**", message.guild.roles.size, true)
      .setFooter("Here could be your advertising", client.user.displayAvatarURL)
      message.channel.send({embed: embed})
    }
  })



client.login(token)
