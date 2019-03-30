const Discord = require('discord.js')
const botconfig = require('../config.json')
const colours = require('../colours.json')

module.exports.run = async (bot, message, args) => {
    if (arg[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)
}

module.exports.config = {
    name: "help",
    aliases: ["h", "halp", "commands", "plshelpme"],
    description: "Lists all Commands",
    noalias: "No Aliases",
    accessableby: "Members"
}