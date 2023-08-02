import { Box, Input } from "./InputLabel.style";
import { ChangeEvent, FormEvent } from "react";

interface InputLabelProps {
  label: string;
  type: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function InputLabel({
  label,
  type,
  handleChange,
}: InputLabelProps) {
  return (
    <Box>
      <label htmlFor={label}>
        {label} <span style={{ color: "red" }}>*</span>
      </label>
      <Input id={label} type={type} name={label} onChange={handleChange} />
    </Box>
  );
}
