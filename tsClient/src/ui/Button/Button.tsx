import React from "react";

export default function Button({ style, onClick, children }) {
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
}
