import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          property="og:title"
          content="Linkedin Message Generator"
          key="title"
        />
        <meta
          property="og:description"
          content="This tool uses GPT-3 to generate personalized LinkedIn messages. It is designed to help you quickly and easily craft professional, effective messages to your connections."
          key="description"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
