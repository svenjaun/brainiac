const Discord = require("discord.js")
const colours = require("../colours.json")


module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.")
if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

let mute = message.mentions.members.first() || message.guild.members.get(args[0])
if(!mute) return message.channel.send("Please supply a user to be muted!")

let reason = args.slice(1).join(" ")
if(!reason) reason = "No reason"

let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Muted",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e)
    }
}

mute.addRole(muterole.id).then(() => {
    message.delete()
    mute.send(`Hello, you have been muted in ${message.guild.name} for: ${reason}`)
    .catch(err => console.log(err))
    message.channel.send(`${mute.user.username} was successfully muted.`)
})

let embed = new Discord.RichEmbed()
.setColor(colours.redlight)
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
.addField("Moderation:", "mute")
.addField("mute:", mute.user.username)
.addField("Moderator:", message.author.username)
.addField("Reason:", reason)
.addField("Date:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "logs")
    sChannel.send(embed)
}

module.exports.config = {
    name: "mute",
    description: "Mutes a member in the discord!",
    usage: "!mute <user> <reason>",
    accessableby: "Members",
    aliases: ["m", "nospeak", "shutthefuckup", "stfu"]
}