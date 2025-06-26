const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'volume',
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Adjusts the playback volume (0.1 to 2.0)')
    .addNumberOption(option =>
      option.setName('level')
        .setDescription('Volume level')
        .setMinValue(0.1)
        .setMaxValue(2.0)
        .setRequired(true)),

  async executeSlash(interaction) {
    const level = interaction.options.getNumber('level');
    const settingsPath = path.join(__dirname, '../database/settings.json');

    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    settings.volume = level;
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    await interaction.reply(`🔊 Volume set to \`\`${level}\`\``);
  }
};