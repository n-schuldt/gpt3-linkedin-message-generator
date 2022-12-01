import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Footer from "./components/Footer";
import PromptForm from "./components/PromptForm";

const Home = () => {
  return (
    <>
      <div className="root">
        <Head>
          <title>GPT-3 Writer</title>
        </Head>
        <section className="container">
          <div className="text-white text-lg lg:text-3xl pt-10">
            <div className="header-title">
              <h1>
                <span className="text-blue-500">LinkedIn </span> <br /> message
                generator
              </h1>
            </div>
            <div className="header-subtitle font-thin tracking-widest pt-5 text-center">
              <h2>Networking Made Simple.</h2>
            </div>
          </div>
          <p className="text-gray-300 text-center">
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
    </>
  );
};

export default Home;
