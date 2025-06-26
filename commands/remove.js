const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'remove',
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Removes a song from the queue')
    .addIntegerOption(option =>
      option.setName('position')
        .setDescription('Queue position to remove')
        .setMinValue(1)
        .setRequired(true)),

  async executeSlash(interaction) {
    const position = interaction.options.getInteger('position') - 1;
    const queuePath = path.join(__dirname, '../database/queue.json');

    if (!fs.existsSync(queuePath)) {
      return interaction.reply('📭 The queue is empty.');
    }

    const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
    if (position < 0 || position >= queue.length) {
      return interaction.reply('❌ Invalid position.');
    }

    const removed = queue.splice(position, 1);
    fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));

    return interaction.reply(`🗑 Removed **${removed[0].title}** from the queue.`);
  }
};