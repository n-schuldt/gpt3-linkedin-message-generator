import React from "react";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import Copy from "./Copy";
import * as Yup from "yup";

const PromptSchema = Yup.object().shape({
  sender: Yup.string()
    .min(2, "Too Short!")
    .max(120, "Too Long!")
    .matches("^[^.]*$", "Don't Include periods")
    .required("Required"),
  recipient: Yup.string()
    .min(2, "Too Short!")
    .max(120, "Too Long!")
    .matches("^[^.]*$", "Don't Include periods")
    .required("Required"),
  other: Yup.string().max(200, "Too Long!"),
});

function PromptForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiOutput, setApiOutput] = useState("");

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
    <>
      <Formik
        initialValues={{
          language: "English",
          sender: "",
          recipient: "",
          other: "",
        }}
        validationSchema={PromptSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          callGenerateEndpoint(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {/* <Field
              type="checkbox"
              name="toggle"
              className="block w-full bg-gray-800 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700"
            /> */}
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-5">
              <label
                class="block uppercase tracking-wide text-gray-600 dark:text-gray-400 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Message Language
              </label>
              <div class="relative">
                <Field
                  as="select"
                  name="language"
                  className="appearance-none block w-full border-2 border-gray-300 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded py-3 px-4 mb-3 leading-tight"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </Field>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-gray-700 dark:fill-gray-300 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <p class="text-gray-400 text-xs italic">
                Fill out all of the fields in{" "}
                <span className="font-semibold">English</span> , the message
                will be in the language you choose.
              </p>
            </div>
            <div class="w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-600 dark:text-gray-400 text-xs font-bold pb-2"
                for="grid-first-name"
              >
                I am...
              </label>
              <Field
                name="sender"
                type="text"
                placeholder="Nicolas, Full-Stack developer living in Paris..."
                className="appearance-none block w-full focus:border-blue-500 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded py-3 px-4 mb-3 leading-tight"
              />
              {errors.sender && touched.sender ? (
                <div className="text-blue-500 text-xs italic">
                  {errors.sender}
                </div>
              ) : null}
            </div>
            <div class="w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-600 dark:text-gray-400 text-xs font-bold pb-2"
                for="grid-first-name"
              >
                I'm messaging...
              </label>
              <Field
                name="recipient"
                type="text"
                placeholder="Sundar Pichai, CEO of Google..."
                className="appearance-none block w-full focus:border-blue-500 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded py-3 px-4 mb-3 leading-tight"
              />
              <div className="text-blue-500 text-xs italic">
                {errors.recipient}
              </div>{" "}
            </div>
            <div class="w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-600 dark:text-gray-400 text-xs font-bold pb-2"
                for="grid-first-name"
              >
                I want to...
              </label>
              <Field
                name="other"
                as="textarea"
                placeholder="Connect, ask for a call..."
                className="appearance-none block w-full focus:border-blue-500 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded py-3 px-4 mb-3 leading-tight"
              />
              <div className="text-blue-500 text-xs italic">{errors.other}</div>
            </div>
            <div className="prompt-buttons px-4 pb-5">
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
        )}
      </Formik>
      {apiOutput && (
        <div className="output pt-5 pb-20">
          <div className="output-header-container text-white font-bold uppercase text-3xl tracking-tighter underline decoration-blue-500 underline-offset-4">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="text-gray-200 bg-slate-900 px-10 py-5 align-center rounded-xl">
            <p className="whitespace-pre-wrap">{apiOutput.trim()}</p>
          </div>
          <p class="text-gray-400 text-sm italic self-start">
            Not what you were expecting? Try again and change the wording a bit!{" "}
            <br /> The same imput can lead to very different outputs.
          </p>
          <div className="self-end">
            <Copy copyText={apiOutput.trim()} />
          </div>
        </div>
      )}
    </>
  );
}

export default PromptForm;
