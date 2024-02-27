const {Client, CommandInteraction, AutocompleteInteraction, MessageAttachment} = require("discord.js");
  module.exports = {
    name: "interactionCreate",
    on: true,
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(client, interaction) {
      if (interaction.isCommand()) {
        const command = client.SlashCommands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(client, interaction);
        } catch (e) {
            console.log(e);
            interaction.reply({content: `There is an error with executing this slashCommand!`, ephemeral: true});
        }
      }
    if (interaction.isButton()) { 
      const button = client.buttons.get(interaction.customId);
      if(!button) return;
      try {
        await button.execute(client, interaction);
      }
      catch (e){
        console.log(e)
        interaction.reply({content: `There is an error with executing this button!`, ephemeral: true});
      }
  }
    if (interaction.isSelectMenu()) { 
      const menu = client.menus.get(interaction.customId);
      if(!menu) return;
      try {
        await menu.execute(client, interaction);
      }
      catch (e){
        console.log(e)
        interaction.reply({content: `There is an error with executing this menu!`, ephemeral: true})
      }
  } 
  if (interaction.isModalSubmit()){
    const modal = client.modals.get(interaction.customId);
    if(!modal) return;
    try {
      await modal.execute(client, interaction);
    }
    catch (e){
      console.log(e)
      interaction.reply({content: `There is an error with executing this modal!`, ephemeral: true})
    }
} 
    
    },
  };
  