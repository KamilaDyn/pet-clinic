import { styled } from "styled-components";

const CardWrapper = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  width: " clamp(24rem, 40%, 400px)",
  maxHeight: "35rem",
  backgroundColor: "#eee",
  borderRadius: "0.24rem",
  boxShadow: "0 20px 40px -14px rgba(0,0,0,0.25)",
  overflow: "auto",
  border: `1px solid ${theme.colors.green600}`,
  height: "100%",
  flexWrap: "wrap",
}));

const Figure = styled.figure({
  maxHeight: "300px",
  margin: 0,
  height: "15rem",
});

const Title = styled.h3(({ theme }) => ({
  position: "relative",
  margin: "0 0 24px",
  paddingBottom: "10px",
  textAlign: "center",
  fontSize: "1.3rem",
  fontWeight: "bold",
  "&:after": {
    content: "''",
    position: "absolute",
    display: "block",
    width: "20%",
    maxWidth: "100px",
    bottom: 0,
    height: "2px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: theme.colors.green600,
  },
}));

const Content = styled.p({
  margin: "0 0 24px",
  fontSize: "1rem",
  lineHeight: "1.5rem",
  flexGrow: 1,
});
const Span = styled.p({
  textAlign: "center",
  fontSize: "0.8rem",
  marginTop: "-2px",
});
export { CardWrapper, Content, Figure, Title, Span };
