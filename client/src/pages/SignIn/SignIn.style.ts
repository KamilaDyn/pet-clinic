import { ThemeProps } from "shared/types";
import { styled } from "styled-components";

const Wrapper = styled.div<ThemeProps>(({ theme }) => ({
  backgroundColor: theme.colors.brown100,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "2rem",
}));
const Card = styled.div<ThemeProps>(({ theme }) => ({
  border: `1px solid ${theme.colors.green600}`,
  backgroundColor: "#fff",
  width: "70%",
  maxWidth: "400px",
  padding: "clamp(2rem, 10vmin, 3.5rem)",
  boxShadow: "0 20px 40px -14px rgba(0,0,0,0.25)",
  borderRadius: "15px",
}));

const Button = styled.button<ThemeProps>(({ theme }) => ({
  padding: "0.5rem 0.8rem",
  fontSize: "1rem",
  border: "none",
  borderRadius: "5px",
  backgroundColor: theme.colors.green600,
  color: "#ffffff",
  cursor: "pointer",
  width: "100%",
}));

const Box = styled.div({
  paddingBlock: "1.5rem",
  textAlign: "center",
});
export { Button, Box, Card, Wrapper };
