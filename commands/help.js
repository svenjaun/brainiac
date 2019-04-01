const Discord = require('discord.js')
const colors = require('./../colours.json')
require('dotenv').config()
const fs = require('fs')
const prefix = process.env.PREFIX

module.exports.run = async (bot, message, args) => {
    var commands = []
    fs.readdir("./commands/", (err, files) => {
        if (err) return console.log(err)
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if (jsfile.length <= 0) {
            return console.log("[LOGS] Couldn't Find Commands!");
        }
        jsfile.forEach((f, i) => {
            let pull = require(`./${f}`)
            console.log("```" + pull.config.name + "```")
            commands.push("```" + pull.config.name + "```")
        })
    })
    console.log(commands)

    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setColor(colors.cyan)
            .setAuthor(`TestBOT HELP`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessable by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHembed);
        }}

    if(!args[0]) {
        message.delete();
        let embed = new Discord.RichEmbed()
        .setAuthor(`Help Command!`, message.guild.iconURL)
        .setColor(colors.redlight)
        .setDescription(`${message.author.username} check your dms!`)

        let Sembed = new Discord.RichEmbed()
        .setColor(colors.cyan)
        .setAuthor(`TestBOT Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`These are the avaliable commands for the TestBOT!\nThe bot prefix is: ${prefix}`)
        .addField(`Commands:`, commands.join() || "Empty")
        .setFooter(`${bot.user.username} 2k19`, bot.user.displayAvatarURL)
        console.log(commands)
        message.channel.send(embed).then(m => m.delete(10000));
        message.author.send(Sembed)
    }
}

module.exports.config = {
    name: "help",
    aliases: ["h", "halp", "commands", "plshelpme"],
    description: "Lists all Commands",
    noalias: "No Aliases",
    accessableby: "Members"
}