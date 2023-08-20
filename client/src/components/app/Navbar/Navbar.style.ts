import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "20%",
  maxHeight: "80px",
  backgroundColor: theme.colors.green600,
  padding: "clamp(1rem, 3vmin, 2rem)",
  paddingBottom: "clamp(1.5rem, 5vmin, 3rem)",
}));

const Box = styled.div({
  display: "flex",
});

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  padding-inline: clamp(1rem, 3vmin, 2rem);
  font-size: clamp(1.2rem, 3vmin, 2rem);
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.brown600};
  }
`;

const Button = styled.button(({ theme }) => ({
  backgroundColor: "#fff",
  border: `1px solid ${theme.colors.brown600}`,
  color: theme.colors.green600,
  marginLeft: "2rem",
  width: "100px",
  padding: "1rem",
  textAlign: "center",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
}));

export { Box, Button, StyledLink, Wrapper };
