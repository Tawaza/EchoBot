const { MessageEmbed } = require('discord.js')
const moment = require('moment');

module.exports.help = {
    name: "userinfo",
    aliases: ['ui'],
    category: "information",
    expectedArgs: "\`<@user>\`",
    minArgs: 0,
    maxArgs: 1,
    ownerOnly: false,
    userPerms: [],
    clientPerms: [],
    nsfw: false,
    cooldown: 3
  }
  
module.exports.run = async (client, message, args, language) => {
  const flags = {
    DISCORD_EMPLOYEE: client.emoji.employee,
    DISCORD_PARTNER: client.emoji.partner,
    BUGHUNTER_LEVEL_1: client.emoji.bughunterlv1,
    BUGHUNTER_LEVEL_2: client.emoji.bughunterlv2,
    HYPESQUAD_EVENTS: client.emoji.hypesquad,
    HOUSE_BRAVERY: client.emoji.bravery,
    HOUSE_BRILLIANCE: client.emoji.brilliance,
    HOUSE_BALANCE: client.emoji.balance,
    EARLY_SUPPORTER: client.emoji.earlysupporter,
    VERIFIED_DEVELOPER: client.emoji.devbadge
  };

  let user = message.mentions.users.first() || message.author;
  let member = message.guild.member(user)
  if(args[0]) member = message.guild.member(message.mentions.users.first());
  let roles = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0, -1);

  let userFlags = member.user.flags.toArray();

  let embed = new MessageEmbed()
    .setAuthor(`${user.tag} :`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512}))
    .setColor("#f50041")
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())
    .addField(`\`🥽\` ${language.USER} :`, [
      `**❯ \`🙎‍♂️\` ${language.USERNAME}:** ${member.user.username}`,
      `**❯ \`🧮\` ${language.TAG}:** ${member.user.discriminator}`,
      `**❯ \`🆔\` ${language.ID} :** ${member.id}`,
      `**❯ \`🤖\` ${language.BOT} :** ${member.user.bot ? `${language.BOTT}` : `${language.BOTF}`}`,
      `**❯ \`🏆\` ${language.FLAGS}:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : `${language.FLAGSN}`}`,
      `**❯ \`🧿\` ${language.AVATAR}:** [${language.AVATARLINK}](${member.user.displayAvatarURL({ dynamic: true })})`,
      `**❯ \`📅\` ${language.TIMECREATED}:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
      `**❯ \`📄\` ${language.STATUS}:** ${member.user.presence.status}`,
      `**❯ \`📟\` ${language.GAME}:** ${member.user.presence.game || `${language.GAMENOT}`}`,
      `\u200b`
    ])
    .addField(`\`👓\` ${language.MEMBER} :`, [
      `**❯ \`🏆\` ${language.HIGHESTROLE}:** ${member.roles.highest.id === message.guild.id ? `${language.HIGHESTROLENONE}` : member.roles.highest.name}`,
      `**❯ \`🗓️\` ${language.SERVERJOIN}:** ${moment(member.joinedAt).format('LL LTS')}`,
      `**❯ \`🎭\` ${language.ROLES} [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : `${language.ROLENONE}`}`,
      `\u200b`
    ]);
  return message.channel.send(embed);
}
