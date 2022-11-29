import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";
import Copy from "./components/Copy";
import { Formik, Field, Form } from "formik";

const Home = () => {
  // const [userInput, setUserInput] = useState("");
  // const onUserChangedText = (event) => {
  //   setUserInput(event.target.value);
  // };
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async (values) => {
    setIsGenerating(true);
    console.log("UI", JSON.stringify({ values }));
    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
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
              <span className="text-blue-500">LinkedIn </span> message generator
            </h1>
          </div>
          <div className="header-subtitle font-thin tracking-widest pt-5 text-center">
            <h2>Networking Made Easier.</h2>
          </div>
        </div>
        <p className="text-gray-300">
          This tool uses GPT-3 to generate personalized LinkedIn messages. It is
          designed to help you quickly and easily craft professional, effective
          messages to your connections.
        </p>
      </div>
      {/* PROMPT FORM */}
      <div className="prompt-container relative">
        <Formik
          initialValues={{
            language: "English",
            sender: "",
            recipient: "",
            toggle: false,
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            callGenerateEndpoint(values);
          }}
        >
          <Form>
            {/* <Field
              type="checkbox"
              name="toggle"
              className="block w-full bg-gray-800 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700"
            /> */}
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-5">
              <label
                class="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Message Language
              </label>
              <div class="relative">
                <Field
                  as="select"
                  name="language"
                  className="appearance-none block w-full bg-gray-800 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </Field>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-gray-300 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <p class="text-gray-400 text-xs italic">
                Fill out all of the fields in English, the message will be in
                the language you choose.
              </p>
            </div>
            <div class="w-full md:w-2/3 px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                I am...
              </label>
              <Field
                name="sender"
                type="text"
                placeholder="Nicolas, CS student living in Paris..."
                className="appearance-none block w-full bg-gray-800 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700"
              />
              <p class="text-gray-400 text-xs italic">Don't include periods.</p>
            </div>
            <div class="w-full md:w-2/3 px-3 mb-2">
              <label
                class="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                I'm messaging...
              </label>
              <Field
                name="recipient"
                type="text"
                placeholder="Sundar Pichai, CEO of Google..."
                className="appearance-none block w-full bg-gray-800 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700"
              />
              <p class="text-gray-400 text-xs italic">Don't include periods.</p>
            </div>
            <div class="w-full md:w-2/3 px-3 mb-2">
              <label
                class="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                I want to...
              </label>
              <Field
                name="other"
                as="textarea"
                placeholder="Connect, ask for a call..."
                className="appearance-none block w-full bg-gray-800 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700"
              />
            </div>
            <div className="prompt-buttons ">
              <button
                type="submit"
                className={
                  isGenerating
                    ? "generate-button loading bg-blue-600 hover:bg-blue-400"
                    : "bg-blue-600 generate-button"
                }
              >
                <div className="generate ">
                  {isGenerating ? (
                    <span className="loader"></span>
                  ) : (
                    <p>Generate</p>
                  )}
                </div>
              </button>
            </div>
          </Form>
        </Formik>
        {/* <form w-full>
          <label
            class="block tracking-wide text-gray-300 text-sm font-bold mb-2"
            for="grid-first-name"
          >
            Explain what you want
          </label>
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
                  ? "generate-button loading bg-blue-600 hover:bg-blue-400"
                  : "bg-blue-600 generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate ">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>
        </form> */}

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
            <div className="self-end">
              <Copy copyText={apiOutput} />
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
