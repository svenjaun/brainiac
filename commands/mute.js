const Discord = require("discord.js")
const colours = require("../colours.json")
const GiphyApiClient = require('giphy-js-sdk-core')
const giphyToken = process.env.GIPHYTOKEN

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.")
    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

    let mute = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!mute) return message.channel.send("Please supply a user to be muted!")

    let reason = args.slice(1).join(" ")
    if (!reason) reason = "No reason"

    let muterole = message.guild.roles.find(r => r.name === "Muted")
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#514f48",
                permissions: []
            })
            message.guild.channels.forEach(async (channel) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                })
            })
        } catch (e) {
            console.log(e)
        }
    }

    mute.addRole(muterole.id).then(() => {
        message.delete()
        mute.send(`Hello, you have been muted in ${message.guild.name} for: ${reason}`)
            .catch(err => console.log(err))
        GiphyApiClient(giphyToken).search('gifs', { "q": "mute" })
            .then((response) => {
                var responseFinal = response.data[Math.floor((Math.random() * 10) + 1) % response.data.length]
                message.channel.send(`${mute.user.username} was successfully muted.`, {
                    files: [responseFinal.images.fixed_height.url]
                })
            }).catch((e) => {
                console.log(e)
            })
    })

    let embed = new Discord.RichEmbed()
        .setColor(colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "mute")
        .addField("mute:", mute.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

    message.guild.channels.find(c => c.name === "logs")
        .send(embed)
        .catch((e) => {
            console.log("Channel 'logs' doesn't exists" + e)
        })
}

module.exports.config = {
    name: "mute",
    description: "Mutes a member in the discord!",
    usage: "!mute <user> <reason>",
    accessableby: "Members",
    aliases: ["m", "nospeak", "shutthefuckup", "stfu"]
}