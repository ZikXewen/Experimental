import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mwn } from "mwn";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

console.log([process.env.TL_NAME, process.env.TL_PASS]);
const bot = await mwn.init({
  apiUrl: "https://liquipedia.net/valorant/api.php",
  username: process.env.TL_NAME,
  password: process.env.TL_PASS,
  userAgent: "ValorantProComps (zikxewen@gmail.com)",
});
app.get("/", (req, res) => {
  bot
    .read("VALORANT_Champions_Tour/2021/Stage_3/Masters")
    .then((data) => {
      var wkt = new bot.wikitext(data.revisions[0].content);
      var temp = {};
      wkt.parseTemplates();
      wkt.templates.forEach((template) => {
        if (template.name === "MatchMaps") {
          template.parameters.forEach((parameter) => {
            if (parameter.name === "details") {
              var mapped_params = {};
              bot.wikitext
                .parseTemplates(parameter.value)[0]
                .parameters.forEach((param) => {
                  mapped_params[param.name] = param.value;
                });
              for (var i = 1; i <= 5; ++i) {
                if (
                  mapped_params[`map${i}`] === undefined ||
                  mapped_params[`map${i}win`] === "skip"
                )
                  break;
                var map = mapped_params[`map${i}`];
                for (var j = 1; j <= 2; ++j) {
                  var picks = [];
                  for (var k = 1; k <= 5; ++k) {
                    picks.push(mapped_params[`map${i}t${j}a${k}`]);
                  }
                  if (temp[map] === undefined) temp[map] = [];
                  temp[map].push(picks);
                }
              }
            }
          });
        }
      });
      console.log("Scraping finished. Sending data...");
      res.json(temp);
    })
    .catch((err) => console.error(err));
});

app.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
