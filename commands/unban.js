const Discord = require("discord.js")
const colours = require("../colours.json")
const prefix = process.env.PREFIX


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

    let bannedMember = await bot.fetchUser(args[0]).catch(console.error)
        if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command!") 
    try {
        message.guild.unban(bannedMember.id)
        message.channel.send(`${bannedMember.tag} has been unbanned from the guild!`)
    } catch(e) {
        console.log(e.message)
    }
    let embed = new Discord.RichEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "unban")
    .addField("Moderated on:", `${bannedMember.username} (${bannedMember.id})`)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
        let sChannel = message.guild.channels.find(c => c.name === "logs")
        //console.log(embed)
        sChannel.send(embed)
        console.log("embed")
}
module.exports.config = {
    name: "unban",
    description: "Unbans a user from the guild!",
    usage: `${prefix}unban`,
    accessableby: "Administrators",
    aliases: ["ub", "banishvanish", "unb", "un"]
}