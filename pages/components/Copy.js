import React from "react";
import { useState } from "react";

function Copy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        onClick={handleCopyClick}
        className="bg-blue-600 rounded-full px-5 py-2 text-gray-300 hover:bg-blue-400"
      >
        <span>{isCopied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}

export default Copy;
