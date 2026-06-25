import express from "express";
import axios from "axios";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server working 🚀");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt: message,
        stream: false
      }
    );

    res.json({
      reply: response.data.response
    });

  } catch (err) {
    console.log(err.message);
    res.json({
      reply: "⚠️ Ollama not running or error"
    });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});