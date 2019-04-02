const Discord = require("discord.js")
const colours = require("../colours.json")
const prefix = process.env.PREFIX


module.exports.run = async (message, args) => {

    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You don't have permission to perform this command!")

    let unbanMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!unbanMember) return message.channel.send("Please metion a user to unban!")

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command")

    unbanMember.send(`Hello, you have been unbanned from ${message.guild.name}`).then(() =>
        message.guild.unban(unbanMember)).catch(console.error)

    message.channel.send(`**${unbanMember.user.tag}** has been unbanned`).then(m => m.delete(5000))

    let embed = new Discord.RichEmbed()
        .setColor(colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "unban")
        .addField("Unbanned user:", unbanMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "logs")
    sChannel.send(embed)
}

module.exports.config = {
    name: "unban",
    description: "Unbans a user from the guild!",
    usage: `${prefix}unban`,
    accessableby: "Administrators",
    aliases: ["ub", "banishvanish", "unb", "un"]
}