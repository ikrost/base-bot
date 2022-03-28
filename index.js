const Main = require('./Main')
const config = require("./config.json")

client = new Main({
    autoReconnect: true,
    disableEveryone: false,
    intents: ["GUILD_MESSAGES", 'GUILDS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'DIRECT_MESSAGES']
});

client.login("TOKEN")