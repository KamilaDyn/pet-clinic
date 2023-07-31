import { styled } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;
export const ImageWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const TextWrapper = styled.div({
  display: "flex",
  width: "100%",
  height: "84vh",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
export const Logo = styled.div({
  width: "200px",
  height: "200px",
});
export const Header = styled.header({
  position: "relative",
  marginBottom: "clamp(2rem, 10vmin, 6rem)",
  display: "flex",
  alignItems: "center",
});

export const Title = styled.h1(({ theme }) => ({
  color: theme.colors.brown600,
  textTransform: "uppercase",
  letterSpacing: "5px",
  fontWeight: "bold",
  fontSize: "clamp(3rem, 15vmin, 8rem)",
  fontFamily: "sans-serif",
  position: "relative",

  "&:after": {
    content: "''",
    position: "absolute",
    top: "95%",
    width: "150%",
    aspectRatio: "3/1",
    left: "50%",
    transform: "translate(-50%, 0)",
    borderRadius: "50%",
    border: `6px solid  ${theme.colors.green600}`,
    mask: "conic-gradient(from 290deg, white 0 140deg, transparent 140deg)",
    clipPath: "polygon(0 0, 50% 50%, 100% 0)",
  },
}));
export const Text = styled.h2(({ theme }) => ({
  color: theme.colors.green400,
  fontWeight: "bold",
  fontSize: "clamp(1.5rem, 4vmin, 2rem)",
}));
