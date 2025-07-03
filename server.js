import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/api/ask", async (req, res) => {
  const { message } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://unemploycoin.com",
      "X-Title": "UnemployCoinChatBot"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are the official assistant for UnemployCoin. Help users understand the project, roadmap, community, and goals. Keep it clear, helpful, and occasionally funny."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  res.send(data);
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
