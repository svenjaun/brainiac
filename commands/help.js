const Discord = require('discord.js')
const colors = require('./../colours.json')
require('dotenv').config()
const fs = require('fs')
const prefix = process.env.PREFIX
const giphyToken = process.env.GIPHYTOKEN
const GiphyApiClient = require('giphy-js-sdk-core')
var commands = []

fs.readdir("./commands/", (err, files) => {
    if (err) return console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!")
    }
    jsfile.forEach((f) => {
        let pull = require(`./${f}`)
        commands.push("```" + pull.config.name + "```")
    })
})

module.exports.run = async (bot, message, args) => {
    if (args[0]) {
        let command = args[0]
        if (bot.commands.has(command)) {
            command = bot.commands.get(command)
            var SHembed = new Discord.RichEmbed()
                .setColor(colors.azure)
                .setAuthor(bot.user.username, bot.user.displayAvatarURL)
                .setThumbnail(message.guild.iconURL)
                .setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${command.config.name}\n
            **Description:** ${command.config.description || "No Description"}\n
            **Accessable by:** ${command.config.accessableby || "Members"}\n
            **Accessable by:** ${command.config.usage || "No Usages"}\n
            **Aliases:** ${command.config.aliases}`)
            message.channel.send(SHembed)
        }
    }

    if (!args[0]) {
        message.delete()
        let embed = new Discord.RichEmbed()
            .setAuthor(`Help Command!`, message.guild.iconURL)
            .setColor(colors.redlight)
            .setDescription(`${message.author.username} check your dms!`)
        let Sembed = new Discord.RichEmbed()
            .setColor(colors.bisque)
            .setAuthor(`${bot.user.username} Help`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setDescription(`These are the avaliable commands for the ${bot.user.username}!\nThe bot prefix is:   ${prefix}`)
            .addField(`Commands:`, commands.join("") || "No Commands found")
            .setFooter(`${bot.user.username} 2k19`, bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(10000))
        message.author.send(Sembed)
    }
    GiphyApiClient(giphyToken).giphy.search('gifs', { "q": "help" })
        .then((response) => {
            var responseFinal = response.data[Math.floor((Math.random() * 10) + 1) % response.data.length]
            message.channel.send({
                files: [responseFinal.images.fixed_height.url]
            }).then(m => m.delete(10000))
        }).catch((e) => {
            console.log(e)
        })
}

module.exports.config = {
    name: "help",
    aliases: ["h", "halp", "commands", "plshelpme"],
    usage: `${prefix}!help or ${prefix}help mute`,
    description: "Lists all Commands",
    accessableby: "Members"
}