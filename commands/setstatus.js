const { SlashCommandBuilder, ActivityType } = require('discord.js');

module.exports = {
  name: 'setstatus',
  data: new SlashCommandBuilder()
    .setName('setstatus')
    .setDescription('Change the bot status')
    .addStringOption(opt =>
      opt.setName('type')
        .setDescription('online, idle, dnd')
        .setRequired(true)
        .addChoices(
          { name: 'online', value: 'online' },
          { name: 'idle', value: 'idle' },
          { name: 'dnd', value: 'dnd' }
        ))
    .addStringOption(opt =>
      opt.setName('activity')
        .setDescription('Type of activity (e.g. Playing, Listening)')
        .setRequired(true)
        .addChoices(
          { name: 'Playing', value: 'Playing' },
          { name: 'Streaming', value: 'Streaming' },
          { name: 'Listening', value: 'Listening' },
          { name: 'Watching', value: 'Watching' }
        ))
    .addStringOption(opt =>
      opt.setName('text')
        .setDescription('Status text')
        .setRequired(true)),

  async executeSlash(interaction, client) {
    const type = interaction.options.getString('type');
    const activity = interaction.options.getString('activity');
    const text = interaction.options.getString('text');

    let activityType;
    switch (activity) {
      case 'Playing': activityType = ActivityType.Playing; break;
      case 'Streaming': activityType = ActivityType.Streaming; break;
      case 'Listening': activityType = ActivityType.Listening; break;
      case 'Watching': activityType = ActivityType.Watching; break;
    }

    client.user.setPresence({
      status: type,
      activities: [{ name: text, type: activityType }]
    });

    return interaction.reply(`✅ Status set to \`\`${activity} ${text}\`\` with \`\`${type}\`\` presence.`);
  }
};