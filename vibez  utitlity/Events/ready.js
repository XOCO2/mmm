const {Client} = require("discord.js");
  module.exports = {
    name: "ready",
    on: true,
    /**
     * @param {Client} client
     */
    async execute(client) {
        console.log(client.user.username, "Ready!");
        client.user.setPresence({activities: [{name: "Source v13", type: "WATCHING"}], status: "idle" });
    },
  };
  