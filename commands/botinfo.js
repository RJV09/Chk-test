const { SlashCommandBuilder } = require('discord.js');
const os = require('os');

module.exports = {
  name: 'botinfo',
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Shows info about the bot'),

  async executeSlash(interaction, client) {
    const uptime = Math.floor(client.uptime / 1000);
    const seconds = uptime % 60;
    const minutes = Math.floor(uptime / 60) % 60;
    const hours = Math.floor(uptime / 3600) % 24;
    const days = Math.floor(uptime / 86400);

    const uptimeStr = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    const totalUsers = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    await interaction.reply({
      embeds: [{
        title: '🤖 Bot Information',
        fields: [
          { name: 'Uptime', value: uptimeStr, inline: true },
          { name: 'Servers', value: `${client.guilds.cache.size}`, inline: true },
          { name: 'Users', value: `${totalUsers}`, inline: true },
          { name: 'Platform', value: os.platform(), inline: true },
          { name: 'CPU', value: os.cpus()[0].model, inline: false }
        ],
        color: 0x00ffcc
      }]
    });
  }
};
