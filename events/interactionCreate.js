const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return interaction.reply({ content: '❌ Unknown command.', ephemeral: true });
    }

    try {
      await command.executeSlash(interaction, client);
    } catch (err) {
      console.error('❌ Error handling slash command:', err);
      if (interaction.replied || interaction.deferred) {
        interaction.followUp({ content: '❌ There was an error executing that command.', ephemeral: true });
      } else {
        interaction.reply({ content: '❌ There was an error executing that command.', ephemeral: true });
      }
    }
  }
};