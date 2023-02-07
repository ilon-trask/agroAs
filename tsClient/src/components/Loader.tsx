import React from "react";

import loader from "../assets/loader.gif";

export default function Loader() {
  return (
    <div style={{ height: "30px", position: "absolute" }}>
      <img
        style={{ height: "30px", position: "absolute" }}
        src={loader}
        alt="loading..."
      />
    </div>
  );
}
