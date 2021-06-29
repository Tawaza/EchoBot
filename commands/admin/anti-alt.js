const { MessageEmbed } = require("discord.js");
const r = require("replacer-js");

module.exports.help = {
  name: "anti-alt",
  aliases: ["antialt"],
  category: "admin",
  expectedArgs: "`<disable/number(days)_to_be_kicked>`",
  minArgs: 1,
  maxArgs: 1,
  ownerOnly: false,
  userPerms: ["MANAGE_GUILD"],
  clientPerms: ["MANAGE_GUILD"],
  nsfw: false,
  cooldown: 3,
  example: 2,
  emoji: "🏉",
};

module.exports.run = async (client, message, args, language, settings) => {
  const time = parseInt(args[0]);
  if (time) {
    if (settings.antiAlt.enabled === true) {
      return message.channel.sendErrorMessage(`${language.ALENABLED}`);
    }
    await client.updateGuild(message.guild, {
      antiAlt: { enabled: true, time: time },
    });
    return message.channel.sendSuccessMessage(
      `${r(language.ENABLED, {
        "{nday}": time,
      })}`
    );
  } else if (args[0].toLowerCase() === "disable") {
    if (settings.antiAlt.enabled === false) {
      return message.channel.sendErrorMessage(`${language.ALDISABLED}`);
    }
    await client.updateGuild(message.guild, { antiAlt: { enabled: false } });
    return message.channel.sendSuccessMessage(`${language.DISABLED}`);
  } else {
    return message.channel.sendErrorMessage(`${language.INVALIDARGS}`);
  }
};
