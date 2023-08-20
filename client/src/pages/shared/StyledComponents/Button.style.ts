import { ThemeProps } from "shared/types";
import { styled } from "styled-components";

export const Button = styled.button<ThemeProps>(({ theme }) => ({
  padding: "0.5rem 0.8rem",
  fontSize: "1rem",
  border: "none",
  borderRadius: "5px",
  backgroundColor: theme.colors.green600,
  color: "#ffffff",
  cursor: "pointer",
  width: "100%",
}));
