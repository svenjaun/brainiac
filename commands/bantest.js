const colors = require('./../colours.json')
require('dotenv').config()
const prefix = process.env.PREFIX
const giphyToken = process.env.GIPHYTOKEN
const GiphyApiClient = require('giphy-js-sdk-core')
giphy = GiphyApiClient(giphyToken)


module.exports.run = async (bot, message, args) => {
    message.channel.send("test")
    const user = message.mentions.users.first(); // returns the user object if an user mention exists
    const banReason = args.slice(1).join(' '); // Reason of the ban (Everything behind the mention)

    // Check if an user mention exists in this message
    if (!user) {
        try {
            // Check if a valid userID has been entered instead of a Discord user mention
            if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!');
            // If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
            user = message.guild.members.get(args.slice(0, 1).join(' '));
            user = user.user;
        } catch (error) {
            return message.reply('Couldn\' get a Discord user with this userID!');
        }
    }
    
    message.guild.member(user).ban

    console.log()

}

module.exports.config = {
    name: "bantest",
    aliases: ["t", "test", "testt", "tet", "tst", "tt"],
    usage: `${prefix}test or ${prefix}help mute`,
    description: "Test commands",
    accessableby: "Members"
}
