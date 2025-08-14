import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PERPLEXITY_URL = "https://api.perplexity.ai/chat/completions";

app.post("/api/perplexity", async (req, res) => {
  try {
    const { query } = req.body;
    const response = await fetch(PERPLEXITY_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "sonar-medium-online",
        messages: [{ role: "user", content: query }],
        temperature: 0.2
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
=== CUT ABOVE FOR server.js ===
