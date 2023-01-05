import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Coffee from "./components/Coffee";
import Footer from "./components/Footer";
import PromptForm from "./components/PromptForm";
import { Analytics } from "@vercel/analytics/react";
import WavesSVG from "../assets/waves.svg";
import Blob from "../assets/blob.svg";
import DarkMode from "../assets/moon.png";

const handleHref = (event) => {
  event.preventDefault();
  const elementId = event.target.getAttribute("href");
  const element = document.querySelector(elementId);
  element.scrollIntoView({ behavior: "smooth" });
};

// Mail
const callMailgunEndpoint = async (values) => {
  console.log("UI", JSON.stringify({ values }));
  console.log("Calling Mailgun...");
  const response = await fetch("/api/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  });
  console.log(response);
};
const handleOnSubmit = async (e) => {
  e.preventDefault();
  const formData = {};
  Array.from(e.currentTarget.elements).forEach((field) => {
    if (!field.name) return;
    formData[field.name] = field.value;
  });
  console.log(formData);
  callMailgunEndpoint(formData);
};

const Home = () => {
  const [darkToggle, setDarkToggle] = useState(false);
  return (
    <div className={darkToggle && "dark"}>
      <div className="absolute top-3 right-3 z-10">
        <Coffee />
      </div>
      <label
        class="toggleDarkBtn bg-gray-200 dark:bg-blue-500 hover:bg-blue-400 dark:hover:bg-gray-200  absolute top-3 left-5 z-10 h-10 w-10 rounded-full shadow flex items-center justify-center p-1 cursor-pointer
      "
      >
        <input
          type="checkbox"
          className="focus:ring-0 hidden"
          onClick={() => setDarkToggle(!darkToggle)}
        />
        <Image src={DarkMode} alt="Dark Mode" />
      </label>
      <div className={`root bg-[#f2f2f4] dark:bg-black`}>
        <Head>
          <title>GPT-3 Writer</title>
        </Head>
        <section className="container min-h-screen">
          <div className="dark:text-white text-black text-lg lg:text-3xl pt-6">
            <div className="header-title">
              <h1>
                <span className="text-blue-500">LinkGen </span> <br /> message
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
          <div className="flex items-center justify-center ">
            <Image src={Blob} className="w-72" />
            <div className=" absolute text-center text-xl font-extrabold ">
              <a
                href="#form"
                className="px-7 py-3 shadow-lg rounded-full hover:bg-blue-500 hover:text-blue-100  bg-blue-100"
                onClick={handleHref}
              >
                Try It Out
              </a>
            </div>
          </div>
          <div>
            <form method="post" onSubmit={handleOnSubmit}>
              <p class="text-blue-500 font-semibold py-3 text-center">
                Sign up for updates on the Chrome Extension
              </p>
              <div class="flex items-stretch">
                <input
                  class="bg-gray-200 rounded-full rounded-r-none dark:bg-gray-800 text-base leading-none text-gray-800 dark:text-white p-5 w-4/5 border border-transparent focus:outline-none focus:border-gray-500"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                />
                <button
                  type="submit"
                  class="w-32 rounded-l-none hover:bg-blue-400 bg-blue-500 rounded-full text-base font-medium leading-none text-white p-5 uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
                >
                  subscribe
                </button>
              </div>
              <p className="pt-3 text-center italic font-thin text-sm">
                No spam, promise
              </p>
            </form>
          </div>
        </section>
        {/* PROMPT FORM */}
        <section
          id="form"
          className="prompt-container relative z-50 pt-10 decoration-blue-500 underline-offset-4"
        >
          <p className="text-4xl text-center font-bold py-10 ">
            Here's the Demo
          </p>
          <PromptForm />
        </section>
        <section></section>
      </div>
      {/* <div className=" w-full">
        <Image src={WavesSVG} alt="Waves SVG" className="w-full -z-10" />
      </div> */}
      <Footer />
      <Analytics />
    </div>
  );
};

export default Home;
