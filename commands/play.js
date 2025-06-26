const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
  name: 'play',
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song from YouTube')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('YouTube URL or search term')
        .setRequired(true)),

  async executeSlash(interaction, client) {
    const query = interaction.options.getString('query');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({ content: '❌ You need to be in a voice channel.', ephemeral: true });
    }

    await interaction.deferReply();

    let songInfo, stream;
    if (ytdl.validateURL(query)) {
      songInfo = await ytdl.getInfo(query);
      stream = ytdl.downloadFromInfo(songInfo, { filter: 'audioonly' });
    } else {
      const result = await ytSearch(query);
      if (!result.videos.length) return interaction.editReply('❌ No video found.');
      const video = result.videos[0];
      songInfo = { videoDetails: { title: video.title, url: video.url } };
      stream = ytdl(video.url, { filter: 'audioonly' });
    }

    const resource = createAudioResource(stream);
    const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });

    player.play(resource);
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });

    connection.subscribe(player);
    player.on(AudioPlayerStatus.Idle, () => connection.destroy());

    await interaction.editReply(`🎶 Now playing: [${songInfo.videoDetails.title}](${songInfo.videoDetails.url})`);
  }
};
