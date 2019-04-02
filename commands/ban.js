const Discord = require("discord.js")
const colours = require("../colours.json")
const prefix = process.env.PREFIX


module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You don't have permission to perform this command!")

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!banMember) return message.channel.send("Please metion a user to ban!")

    let reason = args.slice(1).join(" ")
    console.log(message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
    console.log(message.guild.me.hasPermission(["BAN_MEMBERS"]))
    console.log(message.guild.me.hasPermission(["ADMINISTRATOR"]))
    if (!reason) reason = "No reason given!"
    if (!message.guild.me.hasPermission(["BAN_MEMBERS"]) && !message.guild.me.hasPermission(["ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command")

    banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
    banMember.ban({ days: 1, reason: reason})).catch(err => console.log(err))

    message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))

    let embed = new Discord.RichEmbed()
        .setColor(colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "ban")
        .addField("Banned user:", banMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "logs")
    sChannel.send(embed)
}

module.exports.config = {
    name: "ban",
    description: "Bans a user from the guild!",
    usage: `${prefix}ban <user> <number of days of messages to delete> <reason>`,
    accessableby: "Administrators",
    aliases: ["b", "banish", "remove"]
}