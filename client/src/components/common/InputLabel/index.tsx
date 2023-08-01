import { Box, Input } from "./InputLabel.style";
interface InputLabelProps {
  label: string;
  type: string;
}
export default function InputLabel({ label, type }: InputLabelProps) {
  return (
    <Box>
      <label htmlFor={label}>
        {label} <span style={{ color: "red" }}>*</span>
      </label>
      <Input id={label} type={type} />
    </Box>
  );
}
