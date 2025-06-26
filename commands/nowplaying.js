const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'nowplaying',
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Displays the currently playing song'),

  async executeSlash(interaction) {
    const queuePath = path.join(__dirname, '../database/queue.json');
    if (!fs.existsSync(queuePath)) {
      return interaction.reply('📭 Nothing is currently playing.');
    }

    const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
    if (!queue.length) {
      return interaction.reply('📭 Nothing is currently playing.');
    }

    const current = queue[0];
    await interaction.reply(`🎧 Now playing: [${current.title}](${current.url})`);
  }
};