const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  name: 'stop',
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the music and leaves the voice channel'),

  async executeSlash(interaction) {
    const connection = getVoiceConnection(interaction.guildId);
    if (!connection) {
      return interaction.reply({ content: '❌ I'm not connected to a voice channel.', ephemeral: true });
    }

    connection.destroy();
    return interaction.reply('🛑 Music stopped and disconnected from the voice channel.');
  }
};