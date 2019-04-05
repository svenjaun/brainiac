const Discord = require("discord.js")
const colours = require("../colours.json")
const prefix = process.env.PREFIX


module.exports.run = async (bot, message, args) => {
    console.log("checkpoint-1")
    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You don't have permission to perform this command!")
    console.log("checkpoint-1.1")
    let user = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!user) {
        try {
            if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!');
            user = message.guild.members.get(args.slice(0, 1).join(' '));
            user = user.user;
        } catch (error) {
            return message.reply('Couldn\' get a Discord user with this userID!');
        }
    }
    if (user === message.author) return message.channel.send('You can\'t ban yourself');
    console.log("checkpoint-2")
    console.log(message.guild.member(user))
    message.guild.member(user).ban(7)
  .then(() => console.log(`Banned ${member.displayName}`))
  .catch(console.error);
  //  if (!message.guild.member(user).bannable) return message.reply('You can\'t ban this user because the bot has not sufficient permissions!'); 

    let reason = args.slice(1).join(" ")
    if (!reason) reason = "No reason given"

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command")
    console.log("checkpoint-3")
    message.guild.getUser(banMember).ban(reason).catch(err => console.log(err))
    console.log("checkpoint-4")
    banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
        message.guild.getUser(banMember).ban(reason)).catch(err => console.log(err))

    message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))
    console.log("checkpoint-4")
    let embed = new Discord.RichEmbed()
        .setColor(colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "ban")
        .addField("User:", banMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())
        console.log("checkpoint-5")
    let sChannel = message.guild.channels.find(c => c.name === "logs")
    sChannel.send(embed)
}

module.exports.config = {
    name: "ban",
    description: "Bans a user from the guild!",
    usage: `${prefix}ban`,
    accessableby: "Admin",
    aliases: ["b", "banish", "remove"]
}