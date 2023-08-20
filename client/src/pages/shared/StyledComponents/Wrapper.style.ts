import { ThemeProps } from "shared/types";
import { styled } from "styled-components";

export const Wrapper = styled.div<ThemeProps>(({ theme }) => ({
  backgroundColor: theme.colors.brown100,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "2rem",
}));
