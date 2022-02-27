import { WebhookClient } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL });

webhookClient.send({
  content: "Content",
  username: "Username",
  avatarURL: "https://i.imgur.com/AfFp7pu.png",
});
