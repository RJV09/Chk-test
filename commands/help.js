const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows a list of available commands'),

  async executeSlash(interaction) {
    const commands = [
      '**🎵 Music Commands**',
      '`/play <query>` - Play music',
      '`/pause` - Pause music',
      '`/resume` - Resume music',
      '`/skip` - Skip song',
      '`/stop` - Stop and leave',
      '`/queue` - Show queue',
      '`/volume <1.0>` - Adjust volume',
      '`/loop` - Toggle loop',
      '`/remove <#>` - Remove song',
      '`/nowplaying` - Show now playing',
      '',
      '**⚙️ Utility Commands**',
      '`/help` - Show this help',
      '`/setstatus` - Change bot status',
      '`/botinfo` - Show bot info',
      '`/invites` - Show invite stats'
    ];

    await interaction.reply(commands.join('\n'));
  }
};