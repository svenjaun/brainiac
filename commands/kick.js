const Discord = require("discord.js")
const colours = require("../colours.json");
const prefix = process.env.PREFIX


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
    if(!kickMember) return message.channel.send("Please provide a user to kick!")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")

    kickMember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() => 
    kickMember.kick()).catch(console.error)

    message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete(5000))

    let embed = new Discord.RichEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "kick")
    .addField("Kicked member:", kickMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "logs")
        sChannel.send(embed)

}

module.exports.config = {
    name: "kick",
    description: "Kick a user from the guild!",
    usage: `${prefix}kick <user> <reason>`,
    accessableby: "Moderator",
    aliases: ["k", "getout", "kik"]
}