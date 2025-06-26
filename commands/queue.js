const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'queue',
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Displays the current music queue'),

  async executeSlash(interaction) {
    const queuePath = path.join(__dirname, '../database/queue.json');
    if (!fs.existsSync(queuePath)) {
      return interaction.reply('📭 The queue is empty.');
    }

    const queueData = JSON.parse(fs.readFileSync(queuePath, 'utf-8'));

    if (!queueData || queueData.length === 0) {
      return interaction.reply('📭 The queue is empty.');
    }

    const queueList = queueData.map((track, i) => `${i + 1}. [${track.title}](${track.url})`).join('\n');
    await interaction.reply(`🎶 **Current Queue:**\n${queueList}`);
  }
};