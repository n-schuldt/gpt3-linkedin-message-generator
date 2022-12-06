// vercel serverless function test
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const api_key = process.env.MAILGUN_API_KEY;
const sendMail = async (req, res) => {
  return res.end(`Hello!`);
};

export default sendMail;
