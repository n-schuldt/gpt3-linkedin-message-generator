// vercel serverless function test
const DOMAIN = process.env.MAILGUN_DOMAIN;
const api_key = process.env.MAILGUN_API_KEY;

const mg = require("mailgun-js");
const mailgun = () => mg({ apiKey: api_key, domain: DOMAIN });

const sendMail = async (req, res) => {
  let { email, name } = req.body.values;
  // if name undefied, set it to ""

  console.log("email", email);
  console.log("name", name);
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
        text: `Hey ${name || "there"},

        Thank you for subscribing to our email list!
        We're excited to have you join us and look forward to sharing updates, exclusive offers, and valuable information with you.
        
        Best,
        Nicolas`,
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
