import { styled } from "styled-components";
export const Title = styled.h2(({ theme }) => ({
  color: theme.colors.brown600,
  fontWeight: "bold",
  fontSize: "clamp(2rem, 5vmin, 4rem)",
  textAlign: "center",
  marginBottom: "clamp(2rem, 10vmin, 4rem)",
  position: "relative",
  "&:after": {
    content: "''",
    position: "absolute",
    display: "block",
    width: "50%",
    bottom: 0,
    height: "2px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: theme.colors.green400,
  },
}));
