const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
  name: 'resume',
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes paused music'),

  async executeSlash(interaction) {
    const connection = getVoiceConnection(interaction.guildId);
    if (!connection) {
      return interaction.reply({ content: '❌ I'm not in a voice channel.', ephemeral: true });
    }

    const player = connection.state.subscription?.player;
    if (!player || player.state.status !== AudioPlayerStatus.Paused) {
      return interaction.reply({ content: '⚠️ There is no paused music to resume.', ephemeral: true });
    }

    player.unpause();
    return interaction.reply('▶️ Music resumed!');
  }
};