// vercel serverless function test
const DOMAIN = process.env.MAILGUN_DOMAIN;
const api_key = process.env.MAILGUN_API_KEY;

const mg = require("mailgun-js");
const mailgun = () => mg({ apiKey: api_key, domain: DOMAIN });

const sendMail = async (req, res) => {
  const { email, name } = req.body.values;
  //add user to mailgun list
  // mailgun()
  //   .lists("FinchAI")
  //   .members()
  //   .create(
  //     {
  //       subscribed: true,
  //       address: `${email}`,
  //       name: `${name}`,
  //     },
  //     function (err, data) {
  //       if (err) {
  //         console.log("Error: " + err);
  //       } else {
  //         console.log(data);
  //       }
  //     }
  //   );

  //send mail to user
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
        console.log(body);
      }
    );
  res.status(200).json({ output: "Mail sent" });

  // client.messages
  //   .create(DOMAIN, messageData)
  //   .then((res) => {
  //     console.log(res);
  //     res.status(200).json({ output: "Mail sent" });
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(500).json({ output: "Mail not sent" });
  //   });
  // client.domains
  //   .list()
  //   .then((domains) => console.log(domains))
  //   .catch((err) => console.log(err));
};

export default sendMail;
