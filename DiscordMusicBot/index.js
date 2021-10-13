import Discord from "discord.js";
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const commands = {
  help: ["help", "h"],
  play: ["play", "p"],
  stop: ["stop", "disconnect", "dc", "st"],
  skip: ["skip", "s"],
  loop: ["repeat", "loop", "l"],
  queue: ["queue", "q"],
  filter: ["filter", "f"],
  salim: ["salim"],
  "now playing": ["nowplaying", "now", "np"],
  "list filter": ["listfilter", "lf", "fl"],
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
  plugins: [new SpotifyPlugin()],
});

const toEmbed = (desc, color) => ({
  embeds: [new Discord.MessageEmbed({ description: desc, color: color })],
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
        message.channel.send(
          toEmbed("Please Enter URL or Search Terms.", "RED")
        );
      }
      try {
        distube.play(message, args.join(" "));
      } catch (error) {
        console.error(error);
      }
    }
    if (commands.loop.includes(command)) {
      if (!distube.getQueue(message)) {
        return message.channel.send(toEmbed("Queue Empty!", "RED"));
      }
      const mode = distube.setRepeatMode(message);
      message.channel.send(
        toEmbed(
          "Repeat mode set to **" + ["None", "Single", "Queue"][mode] + "**"
        )
      );
    }
    if (commands.stop.includes(command)) {
      distube.stop(message);
    }
    if (commands.queue.includes(command)) {
      const queue = distube.getQueue(message);
      if (!queue) return message.channel.send(toEmbed("Queue Empty!", "RED"));
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            title: "Current Queue",
            description: queue.songs
              .map(
                (song, id) =>
                  `${id + 1}: [${song.name}](${song.url}) (${
                    song.formattedDuration
                  })`
              )
              .join("\n")
              .slice(0, 4000),
          }),
        ],
      });
    }
    if (commands.skip.includes(command)) {
      const queue = distube.getQueue(message);
      if (!queue) return message.channel.send(toEmbed("Queue Empty!", "RED"));
      if (queue.songs.length > 1) distube.skip(message);
      else distube.stop(message);
    }
    if (commands.filter.includes(command)) {
      const queue = distube.getQueue(message);
      if (!queue) return message.channel.send(toEmbed("Queue Empty!", "RED"));
      if (args[0] === "off" && queue.filters.length > 0) {
        queue.setFilter(false);
      } else if (Object.keys(distube.filters).includes(args[0])) {
        queue.setFilter(args[0]);
      } else if (args[0]) {
        message.channel.send(toEmbed("Invalid Filter.", "RED"));
      } else {
        message.channel.send({
          embeds: [
            new Discord.MessageEmbed({
              title: "Active Filters",
              description:
                queue.filters.length > 0 ? queue.filters.join("\n") : "None.",
            }),
          ],
        });
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
    if (commands["now playing"].includes(command)) {
      const queue = distube.getQueue(message);
      if (!queue) return message.channel.send(toEmbed("Queue Empty!", "RED"));
      const song = queue.songs[0];
      message.channel.send(
        toEmbed(
          `Now Playing: [**${song.name}**](${song.url}) (${song.formattedDuration}) - Requested by ${song.user.tag}`
        )
      );
    }
    if (commands["list filter"].includes(command)) {
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            title: "Available Filters",
            description: Object.keys(distube.filters)
              .map((fil) => `- ${fil}`)
              .join("\n"),
          }),
        ],
      });
    }
    if (commands[salim].includes(command)) {
      axios
        .get("https://watasalim.vercel.app/api/quotes/random")
        .then(({ data }) => message.channel.send(data.quote.body))
        .catch(() =>
          message.channel.send(
            toEmbed("Error fetching Salim quotes :frowning:", "RED")
          )
        );
    }
  });
distube
  .on("addSong", (queue, song) => {
    queue.textChannel.send(
      toEmbed(`Added [**${song.name}**](${song.url}) to queue.`, "GREEN")
    );
  })
  .on("playSong", (queue, song) => {
    queue.textChannel.send(
      toEmbed(
        `Started Playing: [**${song.name}**](${song.url}) (${song.formattedDuration}) - Requested by ${song.user.tag}`
      )
    );
  })
  .on("disconnect", (queue) => {
    queue.textChannel.send(toEmbed("Leaving the Voice Channel..."));
  })
  .on("searchCancel", (message) => {
    message.channel.send(toEmbed("Search Canceled.", "RED"));
  })
  .on("searchNoResult", (message) => {
    message.channel.send(toEmbed("Found Nothing...", "RED"));
  })
  .on("searchInvalidAnswer", (message) => {
    message.channel.send(toEmbed("Invalid Answer. Search Canceled.", "RED"));
  })
  .on("searchDone", () => {})
  .on("searchResult", (message, results) => {
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed({
          title: "Search Results",
          description: results
            .map(
              (result, key) =>
                `${key + 1}: [**${result.name}**](${result.url}) (${
                  result.formattedDuration
                })`
            )
            .join("\n"),
        }).setFooter(
          "Type (1-10) to choose songs, or type other texts to cancel."
        ),
      ],
    });
  })
  .on("error", (channel, error) => {
    channel.send(toEmbed(error.toString().slice(0, 1999), "RED"));
  });
client.login(process.env.BOT_TOKEN);
