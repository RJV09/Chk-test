const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
    client.user.setPresence({
      status: 'online',
      activities: [{ name: '🎵 /help | Music Bot', type: 2 }]
    });
  }
};
