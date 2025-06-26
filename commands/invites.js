const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'invites',
  data: new SlashCommandBuilder()
    .setName('invites')
    .setDescription('Shows how many people you have invited'),

  async executeSlash(interaction) {
    const targetUser = interaction.user;
    const guild = interaction.guild;

    const invites = await guild.invites.fetch();
    const userInvites = invites.filter(inv => inv.inviter && inv.inviter.id === targetUser.id);
    const total = userInvites.reduce((sum, invite) => sum + (invite.uses || 0), 0);

    await interaction.reply(`📨 You have invited **${total}** user(s) to this server.`);
  }
};