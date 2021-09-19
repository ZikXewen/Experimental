import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mwn } from "mwn";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const bot = await mwn.init({
  apiUrl: "https://en.wikipedia.org/w/api.php",
  username: process.env.WIKI_NAME,
  password: process.env.WIKI_PASS,
});
app.get("/", (req, res) => {
  // bot.parseTitle("Yingluck Shinawatra")

  bot
    .read("Yingluck Shinawatra")
    .then((data) => {
      var wkt = new bot.wikitext(data.revisions[0].content);
      wkt.parseSections();
      res.send(wkt.sections);
    })
    .catch((err) => console.error(err));

  // const wikitext = new bot.wikitext(content_string);
  // wikitext
  //   .apiParse()
  //   .then((data) => console.log(data))
  //   .catch((err) => console.error(err));
});

app.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
