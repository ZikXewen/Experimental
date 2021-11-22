import Discord from "discord.js";
import dotenv from "dotenv";
import { keyboard, Key, getActiveWindow } from "@nut-tree/nut-js";

dotenv.config();

var prefix = "fb:";
var discordHandle;
const commands = {
  help: ["help", "h"], // WIP
  mine: ["mine", "m"],
  set: ["set", "s"], // WIP backpack or pick
};
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});
var userTag, timeLeft, mode;
const typeln = async (message) => {
  await keyboard.type(message);
  await keyboard.type(Key.Enter);
};
const checkTimeLeft = (channel, count) => {
  if (count > 10) {
    channel.send("Waited over 10 seconds. Terminating...");
    userTag = null;
    return;
  }
  if (!timeLeft) {
    setTimeout(() => checkTimeLeft(channel, count + 1), 1000);
    return;
  }
  channel.send(`Return to Discord in ${timeLeft} seconds.`);
  if (timeLeft > 20) {
    setTimeout(() => {
      channel.send("15 seconds remaining!");
    }, (timeLeft - 14) * 1000);
  }
  setTimeout(() => mine(channel), (timeLeft + 1) * 1000);
};
const mine = async (channel) => {
  if (!userTag) return; // For stopping
  const { windowHandle } = await getActiveWindow();
  console.log(discordHandle);
  if (windowHandle === discordHandle) {
    await typeln(";s");
    await typeln(`;up ${mode ? "p" : "b"} a`);
    timeLeft = null;
    await typeln(";bp");
    checkTimeLeft(channel, 0);
  } else {
    channel.send("Not on Discord. Terminating...");
    userTag = null;
  }
};
const parseTime = (str) => {
  var ret = 0;
  str = String(str).split("h");
  if (str.length > 1) ret += parseInt(str.shift()) * 3600;
  str = str[0].split("m");
  if (str.length > 1) ret += parseInt(str.shift()) * 60;
  str = str[0].split("s");
  if (str[0].length) ret += parseInt(str.shift());
  return ret;
};
client.on("messageCreate", async (message) => {
  if (message.author.tag === "Idle Miner#5426") {
    if (
      message.embeds[0]?.author?.name === userTag &&
      message.embeds[0]?.fields[0]?.name === "**Backpack**"
    ) {
      timeLeft = parseTime(
        message.embeds[0]?.fields[0]?.value?.split("\n")[4].split(" ")[2]
      );
    }
    return;
  }
  if (message.author.bot || !message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/\s+/g);
  const command = args.shift();
  if (commands.mine.includes(command)) {
    if (userTag) {
      console.log(`Stopped mining for ${userTag}.`);
      userTag = null;
    } else {
      userTag = message.author.tag;
      discordHandle = (await getActiveWindow()).windowHandle;
      console.log(`Starting to mine for ${userTag}...`);
      mine(message.channel);
    }
  }
  if (commands.set.includes(command)) {
    mode = !mode;
    message.channel.send(
      `Switched to buying ${mode ? "Pickaxe" : "Backpack"}.`
    );
  }
});
client.login(process.env.BOT_TOKEN);
