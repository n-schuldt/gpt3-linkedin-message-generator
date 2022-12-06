// vercel serverless function test
const DOMAIN = process.env.MAILGUN_DOMAIN;
const api_key = process.env.MAILGUN_API_KEY;

const mg = require("mailgun-js");
const mailgun = () => mg({ apiKey: api_key, domain: DOMAIN });

const sendMail = async (req, res) => {
  const { email, name } = req.body.values;
  // add user to mailing list
  mailgun()
    .lists("hello@mg.aifinch.com")
    .members()
    .create(
      { subscribed: true, address: email, name: name },
      function (error, body) {
        if (error) {
          console.log(error);
        } else {
          console.log(body);
        }
      }
    );

  // send mail to user
  mailgun()
    .messages()
    .send(
      {
        from: "Nicolas at FinchAI <nicolas@aifinch.com>",
        to: `${email}`,
        subject: `Thanks for signing up!`,
        text: `Hello ${name},
         Thanks for signing up. We'll keep you posted on our progress.`,
      },
      function (error, body) {
        if (error) {
          res.status(500).json({ output: "Mail not sent", error: error });
          console.log(error);
        } else {
          res.status(200).json({ output: "Mail sent" });
          console.log(body);
        }
      }
    );
};

export default sendMail;
