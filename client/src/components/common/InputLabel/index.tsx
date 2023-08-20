import { Box, Input } from "./InputLabel.style";
import { ChangeEvent, FormEvent } from "react";

interface InputLabelProps {
  label: string;
  type: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}
export default function InputLabel({
  label,
  type,
  name,
  handleChange,
}: InputLabelProps) {
  return (
    <Box>
      <label htmlFor={label}>
        {label} <span style={{ color: "red" }}>*</span>
      </label>
      <Input id={label} type={type} name={name} onChange={handleChange} />
    </Box>
  );
}
