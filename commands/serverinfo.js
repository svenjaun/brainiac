const Discord = require('discord.js')
const colors = require('./../colours.json')

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setColor(colors.blueviolet)
    .setTitle("UserInfo")
    .setAuthor(message.guild.name + " Info", message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .addField("**Guild Name:**", message.guild.name, true)
    .addField("**Guild Owner:**", message.guild.owner, true)
    .addField("**Member Count:**", message.guild.memberCount, true)
    .addField("**Role Count:**", message.guild.roles.size, true)
    .setFooter("Here could be your advertising", bot.user.displayAvatarURL)
    message.channel.send({embed: embed})
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["serverinfo", "info", "Desc", "Info", "ServerInfo", "Serverinfo"],
    description: "Lists Guild infos",
    noalias: "No Aliases",
    accessableby: "Members"
}