import React from "react";

import loader from "../assets/loader.gif";

export default function Loader() {
  return (
    <img
      src={loader}
      alt="loading..."
      style={{ height: "50px", position: "absolute" }}
    />
  );
}
