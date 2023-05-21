const express = require("express");
const OPENAI_API_KEY = "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";
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const question = req.body.question;

    // Fetching the answer from OpenAI
    const response = await await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
      });

    // Extracting the answer from the response
    const answer = response.data.choices[0].text.trim();

    // Splitting the answer into an array of lines
    const array = answer.split("\n").filter((value) => value.trim());

    res.json({
      answer: array,
      prompt: question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while processing your request",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});