const discord = require("discord.js")
const fs = require("fs")
const { EmbedBuilder } = require("discord.js")
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent
  ],
});

client.once('ready', () => {
  console.log('Bot hazir cnmm!');
});


const starboardChannelId = 'your_channel_id';
client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.emoji.name === '⭐' && reaction.count >= 3) {
    const message = reaction.message;
    const channel = message.guild.channels.cache.get(starboardChannelId);

    const starboardMessages = await channel.messages.fetch({ limit: 100 });
    const existingStarboardMessage = starboardMessages.find(m => m.embeds.length > 0 && m.embeds[0].footer.text.endsWith(`• ${message.id}`));

    if (existingStarboardMessage) {
      const oldEmbed = existingStarboardMessage.embeds[0];
      const oldStars = parseInt(oldEmbed.footer.text.split(' ')[1]);
      const newStars = reaction.count;

      const embed = new EmbedBuilder(oldEmbed)
        .setFooter({text: `⭐ ${newStars} • ${message.id}`});
      await existingStarboardMessage.edit({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setColor('#FFAC33')
        .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL()})
        .setFooter({text: `⭐ ${reaction.count} • ${message.id}`})
        .setTimestamp();

        const attachment = message.attachments.first();
  if(message.content > '') {
    embed.setDescription(message.content);
  } else { 
  if (message.content === '' && message.attachments.size > 0) 
   embed.setImage(attachment.url);
   } 
   
   if(message.content > '' && message.attachments.size > 0) {
    embed.setImage(attachment.url);
    embed.setDescription(message.content);
    
   }
      await channel.send({ embeds: [embed] });
 
      
    } 
   
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.emoji.name === '⭐' && reaction.count >= 2) {
    const message = reaction.message;
    const channel = message.guild.channels.cache.get(starboardChannelId);

    const starboardMessages = await channel.messages.fetch({ limit: 100 });
    const existingStarboardMessage = starboardMessages.find(m => m.embeds.length > 0 && m.embeds[0].footer.text.endsWith(`• ${message.id}`));


        if (existingStarboardMessage) {
          const oldEmbed = existingStarboardMessage.embeds[0];
          const oldStars = parseInt(oldEmbed.footer.text.split(' ')[1]);
          const newStars = reaction.count;

          if (newStars >= 2) {
            const embed = new EmbedBuilder(oldEmbed)
            await existingStarboardMessage.delete({ embeds: [embed] });
      }}}});


client.login('token');
