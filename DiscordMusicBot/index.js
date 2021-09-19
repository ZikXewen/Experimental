import Discord, { MessageEmbed } from "discord.js";
import { DisTube } from "distube";
import dotenv from "dotenv";

dotenv.config();

const commands = {
  help: ["help", "h"],
  play: ["play", "p"],
  stop: ["stop", "disconnect", "dc"],
  skip: ["skip", "s"],
  loop: ["repeat", "loop", "l"],
  queue: ["queue", "q"],
  filter: ["filter", "f"],
};
const prefix = "??";
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_VOICE_STATES", "GUILD_MESSAGES"],
});
const distube = new DisTube(client, {
  searchSongs: 10,
  emitNewSongOnly: true,
  leaveOnFinish: true,
  nsfw: true,
});

client
  .on("ready", () => {
    console.log(`${client.user.tag} logged in. Ready to run!`);
    client.user.setActivity({ type: "COMPETING", name: "??help" });
  })
  .on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/\s+/g);
    const command = args.shift();
    if (commands.play.includes(command)) {
      if (args.length === 0) {
        message.channel.send("Please Enter URL or Search Terms.");
      }
      try {
        distube.play(message, args.join(" "));
      } catch (error) {
        console.error(error);
      }
    }
    if (commands.loop.includes(command)) {
      if (!distube.getQueue(message)) {
        return message.channel.send("Queue Empty!");
      }
      const mode = distube.setRepeatMode(message);
      message.channel.send(
        "Repeat mode set to " + ["None", "Single", "Queue"][mode]
      );
    }
    if (commands.stop.includes(command)) {
      distube.stop(message);
    }
    if (commands.queue.includes(command)) {
      const queue = distube.getQueue(message);
      if (!queue) return message.channel.send("Queue Empty!");
      message.channel.send(
        "Current Queue:\n" +
          queue.songs
            .map(
              (song, id) =>
                `${id + 1}: ${song.name} (${song.formattedDuration})`
            )
            .join("\n")
      );
    }
    if (commands.skip.includes(command)) {
      const queue = distube.getQueue(message);
      if (!queue) return message.channel.send("Queue Empty!");
      if (queue.songs.length > 1) distube.skip(message);
      else distube.stop(message);
    }
    if (commands.filter.includes(command)) {
      const queue = distube.getQueue(message);
      if (!queue) return message.channel.send("Queue Empty!");
      if (args[0] === "off" && queue.filters.length > 0) {
        queue.setFilter(false);
      } else if (Object.keys(distube.filters).includes(args[0])) {
        queue.setFilter(args[0]);
      } else if (args[0]) {
        message.channel.send("Invalid Filter.");
      } else {
        message.channel.send("Current Filters: " + queue.filters.join(", "));
      }
    }
    if (commands.help.includes(command)) {
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            title: "Commands",
            description: Object.entries(commands)
              .map(([key, val]) => `**${key}**: ${val.join(", ")}`)
              .join("\n"),
          }),
        ],
      });
    }
  });
distube
  .on("addSong", (queue, song) => {
    queue.textChannel.send(`Added ${song.name} to queue.`);
  })
  .on("playSong", (queue, song) => {
    queue.textChannel.send(
      `Now Playing: **${song.name}** (${song.formattedDuration}) - Requested by ${song.user.tag}`
    );
  })
  .on("disconnect", (queue) => {
    queue.textChannel.send("Leaving the Voice Channel...");
  })
  .on("searchCancel", (message) => {
    message.channel.send("Search Canceled.");
  })
  .on("searchNoResult", (message) => {
    message.channel.send("Found Nothing...");
  })
  .on("searchInvalidAnswer", (message) => {
    message.channel.send("Invalid Answer. Search Canceled.");
  })
  .on("searchDone", () => {})
  .on("searchResult", (message, results) => {
    message.channel.send({
      embeds: [
        new MessageEmbed({
          title: "Search Results",
          description: results
            .map(
              (result, key) =>
                `${key + 1}: **${result.name}** (${result.formattedDuration})`
            )
            .join("\n"),
          timestamp: "",
        }).setFooter(
          "Type (1-10) to choose songs, or type other texts to cancel."
        ),
      ],
    });
  })
  .on("error", (channel, error) => {
    channel.send(error.toString().slice(0, 1999));
  });
client.login(process.env.BOT_TOKEN);
