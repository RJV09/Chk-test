const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  name: 'pause',
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the currently playing music'),

  async executeSlash(interaction) {
    const connection = getVoiceConnection(interaction.guildId);
    if (!connection) {
      return interaction.reply({ content: '❌ I'm not connected to a voice channel.', ephemeral: true });
    }

    const player = connection.state.subscription?.player;
    if (!player || player.state.status !== 'playing') {
      return interaction.reply({ content: '⚠️ Nothing is currently playing.', ephemeral: true });
    }

    player.pause();
    return interaction.reply('⏸️ Music paused.');
  }
};