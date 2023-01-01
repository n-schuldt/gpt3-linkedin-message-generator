import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Coffee from "./components/Coffee";
import Footer from "./components/Footer";
import PromptForm from "./components/PromptForm";
import { Analytics } from "@vercel/analytics/react";

const Home = () => {
  const [darkToggle, setDarkToggle] = useState(false);
  return (
    <div className={darkToggle && "dark"}>
      <div className="absolute top-2 right-1 z-10">
        <Coffee />
      </div>
      <label class="toggleDarkBtn absolute top-2 left-5 z-10">
        <input type="checkbox" onClick={() => setDarkToggle(!darkToggle)} />
        <span class="slideBtnTg round"></span>
      </label>

      <div className={`root dark:bg-black`}>
        <Head>
          <title>GPT-3 Writer</title>
        </Head>
        <section className="container">
          <div className="dark:text-white text-black text-lg lg:text-3xl pt-10">
            <div className="header-title">
              <h1>
                <span className="text-blue-500">LinkedIn </span> <br /> message
                generator
              </h1>
            </div>
            <div className="dark:text-gray-300 text-gray-700 header-subtitle font-thin tracking-widest pt-5 text-center">
              <h2>Networking Made Simple.</h2>
            </div>
          </div>
          <p className="dark:text-gray-300 text-gray-700 text-center">
            This tool uses A.I. (GPT-3) to generate personalized LinkedIn
            messages. It is designed to help you quickly and easily craft
            professional, effective messages to your connections.
          </p>
        </section>
        {/* PROMPT FORM */}
        <section className="prompt-container relative">
          <PromptForm />
        </section>
      </div>
      <Footer />
      <Analytics />
    </div>
  );
};

export default Home;
