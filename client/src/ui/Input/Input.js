import React from "react";

export default function Input({ placeholder, type, value, onChange, step }) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step={step}
      value={value}
      onChange={onChange}
    />
  );
}
