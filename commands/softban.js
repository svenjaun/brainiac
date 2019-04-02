const Discord = require("discord.js")
const colours = require("../colours.json")
const prefix = process.env.PREFIX


module.exports.run = async (message, args) => {

   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

   let banMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let days = args.slice(1).join(" ")
   let reason = args.slice(2).join(" ")
   if (!/^\+?(0|[1-9]\d*)$/.test(days)) reason = args.slice(1).join(" ")
   else if(days > Number.MAX_SAFE_INTEGER) days = 1
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

   banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
   message.guild.ban(banMember, { days: days, reason: reason})).then(() => message.guild.unban(banMember.id, { reason: "Softban"})).catch(console.error)

   message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))

    let embed = new Discord.RichEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "ban")
    .addField("Softbanned user:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "logs")
        sChannel.send(embed)
}

module.exports.config = {
    name: "softban",
    description: "Softbans a user from the guild!",
    usage: `${prefix}softban <user> <number of days of messages to delete> <reason>`,
    accessableby: "Administrators",
    aliases: ["sb", "sbanish", "sremove"]
}