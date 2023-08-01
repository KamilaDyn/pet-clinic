import { styled } from "styled-components";

export const Box = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
  borderRadius: `1px solid ${theme.colors.green600}`,
  paddingBottom: "clamp(1rem, 3vmin, 1.5rem)",
}));

export const Input = styled.input(({ theme }) => ({
  padding: "10px",
  borderRadius: "5px",
  border: `1px solid ${theme.colors.green400}`,
}));
