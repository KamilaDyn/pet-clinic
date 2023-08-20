import { ThemeProps } from "shared/types";
import { styled } from "styled-components";

export const Card = styled.div<ThemeProps>(({ theme }) => ({
  border: `1px solid ${theme.colors.green600}`,
  backgroundColor: "#fff",
  width: "70%",
  maxWidth: "400px",
  padding: "clamp(2rem, 10vmin, 3.5rem)",
  boxShadow: "0 20px 40px -14px rgba(0,0,0,0.25)",
  borderRadius: "15px",
}));
