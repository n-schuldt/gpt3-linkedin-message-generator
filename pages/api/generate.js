import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(req.body.values);
  const prompt = `I am ${req.body.values?.sender}. I'm writing to ${req.body.values?.recipient}. I want to ${req.body.values?.other}.
  I'm writing a LinkedIn message in ${req.body.values?.language}. ${req.body.values?.other}.
  Message:`;
  console.log(`API: ${prompt}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.75,
    max_tokens: 600,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
