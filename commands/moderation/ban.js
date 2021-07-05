const { MessageEmbed } = require("discord.js");
const replace = require("replacer-js");

module.exports.help = {
  name: "ban",
  aliases: [],
  category: "moderation",
  expectedArgs: "`<@user>` `[reason]`",
  minArgs: 1,
  maxArgs: null,
  ownerOnly: false,
  userPerms: ["BAN_MEMBERS"],
  clientPerms: ["BAN_MEMBERS"],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: "🔨",
};

module.exports.run = async (client, message, args, language) => {
  const member = message.mentions.members.first();
  const reason = args.slice(1).join(" ") || `${language.NOREASON}`;

  if (!member)
    return message.channel.sendErrorMessage(`${language.INVALIDMEMBER}`);

  if (message.member.roles.highest.position <= member.roles.highest.position)
    return message.channel.sendErrorMessage(`${language.INSUFICIENTROLE}`);

  if (message.guild.me.roles.highest.position <= member.roles.highest.position)
    return message.channel.sendErrorMessage(`${language.BOTINSUFICIENTROLE}`);

  member.ban({ days: 7, reason: reason });

  const sucess = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `${client.emoji.check} **${replace(language.SUC, {
        "{user}": member.user.username,
        "{moderator}": message.author.username,
        "{reason}": reason,
      })}**`
    )
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  message.channel.send({ embeds: [sucess] });
};
