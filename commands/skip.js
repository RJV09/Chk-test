const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  name: 'skip',
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the currently playing song'),

  async executeSlash(interaction) {
    const connection = getVoiceConnection(interaction.guildId);
    if (!connection) {
      return interaction.reply({ content: '❌ I'm not in a voice channel.', ephemeral: true });
    }

    const player = connection.state.subscription?.player;
    if (!player) {
      return interaction.reply({ content: '⚠️ No song is currently playing.', ephemeral: true });
    }

    player.stop();
    return interaction.reply('⏭️ Skipped the current song.');
  }
};