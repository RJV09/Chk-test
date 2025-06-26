const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'loop',
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Toggles loop mode for the current song'),

  async executeSlash(interaction) {
    const settingsPath = path.join(__dirname, '../database/settings.json');
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

    settings.loop = !settings.loop;
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    const state = settings.loop ? '🔁 Loop enabled' : '➡️ Loop disabled';
    await interaction.reply(state);
  }
};