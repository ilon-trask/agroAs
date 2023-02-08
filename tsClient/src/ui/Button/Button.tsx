import React, { ReactNode } from "react";

type props = { style?: {}; onClick: () => void; children: ReactNode };

export default function Button({ style, onClick, children }: props) {
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
}
