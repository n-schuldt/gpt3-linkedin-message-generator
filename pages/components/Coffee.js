//Buy me a coffee react component

import React from "react";
import Image from "next/image";
import coffee from "../../assets/coffee.png";

const Coffee = () => {
  return (
    <a
      className="flex items-center bg-blue-500 px-6 py-1 rounded-full hover:bg-blue-300
        "
      href="https://donate.stripe.com/cN2dRndRu9bqfcY6oo"
    >
      <h3 className="font-thin blue">Buy me a coffee?</h3>
      <Image src={coffee} alt="coffee" width={40} height={40} />
    </a>

    //button with a link to a stripe donation page
  );
};

export default Coffee;
