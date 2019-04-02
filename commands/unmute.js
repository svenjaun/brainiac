const Discord = require("discord.js")
const prefix = process.env.PREFIX

module.exports.run = async (message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

    let mute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!mute) return message.channel.send("Please supply a user to be muted!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given"

    let muterole = message.guild.roles.find(r => r.name === "Muted")
    if (!muterole) return message.channel.send("There is no mute role to remove!")

    mute.removeRole(muterole.id).then(() => {
        message.delete()
        mute.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(console.error)
        message.channel.send(`${mute.user.username} was unmuted!`)
    })

    let embed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "unmute")
        .addField("Unmuted User:", mute.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "logs")
    sChannel.send(embed)

}

module.exports.config = {
    name: "unmute",
    description: "Unmutes a member!",
    usage: `${prefix}unmute <user> <reason>`,
    accessableby: "Members",
    aliases: ["unm", "speak"]
}