const { Events } = require('discord.js');

module.exports = {
  name: Events.InviteCreate,
  once: false,
  async execute(invite) {
    console.log(`📥 New invite created: ${invite.code} by ${invite.inviter?.tag || 'unknown'}`);
  }
};