import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer</title>
      </Head>
      <div className="container">
        <div className="text-white text-lg lg:text-3xl pt-10">
          <div className="header-title">
            <h1>
              <span className="text-blue-500 ">LinkedIn</span> message generator
            </h1>
          </div>
          <div className="header-subtitle pt-5 text-center">
            <h2>
              <span className=" font-thin tracking-widest">
                Networking Made Easier:
              </span>
              <br />
              say goodbye to networking anxiety
            </h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <p className="text-gray-300 text-left">Explain what you want:</p>
        <textarea
          placeholder="start typing here"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />
        <div className="prompt-buttons ">
          <a
            className={
              isGenerating
                ? "generate-button loading bg-blue-600"
                : "bg-blue-600 generate-button"
            }
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? (
                <span className="loader"></span>
              ) : (
                <p>Generate</p>
              )}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output pt-5 pb-20">
            <div className="output-header-container text-white font-bold uppercase text-3xl tracking-tighter underline decoration-blue-500 underline-offset-4">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content bg-slate-900 px-10 py-5 align-center rounded-xl">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
