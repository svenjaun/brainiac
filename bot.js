const Discord = require('discord.js')
const bot = new Discord.Client(
  {
    disabledEvents: ["TYPING_START"],
    disableEveryone: true,
    messageCacheMaxSize: 100,
    messageCacheLifetime: 240,
    messageSweepInterval: 300
  });
const fs = require('fs')
require('dotenv').config()
const token = process.env.TOKEN
const prefix = process.env.PREFIX

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err)
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    return console.log("[LOGS] Couldn't Find Commands!");
  }
  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    bot.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name)
    });
  });
});

bot.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;

  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!message.content.startsWith(prefix)) return;
  console.log("asdasdd");
  let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
  if (commandfile) commandfile.run(bot, message, args)
  
})


bot.on("disconnect", async () => console.log(bot.user.username + " is disconnecting..."))
bot.on("reconnecting", async () => console.log(bot.user.username + "Bot reconnecting..."))
bot.on("error", async err => console.log("Client error: " + err))
bot.on("warn", async info => console.log("Client warning: " + info))
bot.on('guildMemberAdd', guildMember => {
  guildMember.setNickname("SUB2PEWDS", "SUB2PEWDS")
})
bot.on('ready', () => {
  console.log('Bot is ready...')
  bot.user.setActivity('Making memes', { type: "LISTENING" })
})
bot.login(token)
