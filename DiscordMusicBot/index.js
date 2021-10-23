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
  salim: ["salim", "sl"],
  lyrics: ["lyrics", "ly"],
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
  youtubeCookie: process.env.COOKIE,
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
        return message.channel.send(
          toEmbed("No songs... :slight_smile:", "RED")
        );
      }
      const mode = distube.setRepeatMode(message);
      message.channel.send(
        toEmbed(
          "Repeat mode set to **" + ["None", "Single", "Queue"][mode] + "**"
        )
      );
    }
    if (commands.stop.includes(command)) {
      const queue = distube.getQueue(message);
      if (!queue)
        return message.channel.send(
          toEmbed("No songs... :slight_smile:", "RED")
        );
      distube.stop(message);
    }
    if (commands.queue.includes(command)) {
      const queue = distube.getQueue(message);
      if (!queue)
        return message.channel.send(
          toEmbed("No songs... :slight_smile:", "RED")
        );
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
      if (!queue)
        return message.channel.send(
          toEmbed("No songs... :slight_smile:", "RED")
        );
      if (queue.songs.length > 1) distube.skip(message);
      else distube.stop(message);
    }
    if (commands.filter.includes(command)) {
      const queue = distube.getQueue(message);
      if (!queue)
        return message.channel.send(
          toEmbed("Play some songs to apply filters.", "RED")
        );
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
      if (!queue)
        return message.channel.send(
          toEmbed("No song is playing... :slight_smile:", "RED")
        );
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
    if (commands.lyrics.includes(command)) {
      const queue = distube.getQueue(message);
      if (args[0] || queue) {
        axios
          .get(
            encodeURI(
              `https://api.musixmatch.com/ws/1.1/track.search?apikey=${
                process.env.MM_KEY
              }&q=${
                args[0]
                  ? args.join(" ").replace("/", "*")
                  : queue.songs[0].name.replace("/", "*")
              }&s_track_rating=desc`
            )
          )
          .then(({ data }) => {
            if (data.message.header.status_code != 200) {
              message.channel.send(
                `Error Searching Lyrics. Status: ${data?.message?.header?.status_code} :frowning:`
              );
            } else if (data.message.body.track_list[0]) {
              message.channel.send({
                embeds: [
                  new Discord.MessageEmbed({
                    title: "Lyrics Found",
                    author: {
                      name: "Powered by Musixmatch",
                      url: "https://www.musixmatch.com/",
                    },
                    description: data.message.body.track_list
                      .map(
                        ({ track }, key) =>
                          `${key + 1}: [**${track.track_name}** - ${
                            track.artist_name
                          }](${track.track_share_url})`
                      )
                      .join("\n"),
                  }),
                ],
              });
            } else {
              message.channel.send(
                toEmbed(
                  args[0]
                    ? "We couldn't find any lyrics for your query. :frowning:"
                    : "Not found... Try searching with search terms instead."
                )
              );
            }
          });
      } else {
        message.channel.send(
          toEmbed(
            "Play some songs or enter search terms for lyrics search :slight_smile:",
            "RED"
          )
        );
      }
    }
    if (commands.salim.includes(command)) {
      if (args[0]) {
        axios
          .post(
            "https://api-inference.huggingface.co/models/tupleblog/salim-classifier",
            {
              inputs:
                args.join(" ") + (args.join(" ").length < 50 ? "<pad>" : ""),
            },
            {
              headers: {
                Authorization: "Bearer " + process.env.HF_KEY,
              },
            }
          )
          .then(({ data }) => {
            const score = data[0][1].score * 100;
            message.channel.send(
              `This quote is ${score.toFixed(2)}% Salim.` +
                (score > 80 ? " :cold_face::cold_face:" : "")
            );
          })
          .catch(() =>
            message.channel.send(
              "Error Salim classification request :frowning:",
              "RED"
            )
          );
      } else {
        axios
          .get("https://watasalim.vercel.app/api/quotes/random")
          .then(({ data }) => message.channel.send(data.quote.body))
          .catch(() =>
            message.channel.send(
              toEmbed("Error fetching Salim quotes :frowning:", "RED")
            )
          );
      }
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
