import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    brown600: "hsl(3, 17%, 44%)",
    brown100: "hsl(3, 17%, 87%)",
    green600: "hsl(166, 99%, 30%)",
    green400: "hsl(148, 63%, 31%)",
  },
};

export default function Theme({ children }: { children: JSX.Element }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
