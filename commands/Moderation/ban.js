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
};

module.exports.run = async (client, message, args, language) => {
  const heheCannot = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.ROLEHIGH}**`);
  const heheCannotBot = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(`${client.emoji.cross} **${language.BOT}**`);
  const noPerms = new MessageEmbed()
    .setColor("#f50041")
    .setDescription(
      `${client.emoji.cross} **I can't ban this user because my role is not as high as his !**`
    );

  const member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");

  if (!member) return message.channel.send(heheCannotBot);

  if (message.member.roles.highest.position <= member.roles.highest.position)
    return message.channel.send(heheCannot);

  if (message.guild.me.roles.highest.position <= member.roles.highest.position)
    return message.channel.send(noPerms);

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

  message.channel.send(sucess);
};
