import React from "react";

type props = {
  placeholder?: string;
  type: "text" | "number";
  value: number | string;
  onChange: (e: any) => void;
  step?: string;
  disabled?: boolean;
};

export default function Input({
  placeholder,
  type,
  value,
  onChange,
  step,
  disabled,
}: props) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step={step}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
