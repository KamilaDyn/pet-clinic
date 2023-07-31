import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Box = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "20%",
  maxHeight: "80px",
  padding: "clamp(1rem, 3vmin, 2rem)",
  backgroundColor: theme.colors.green600,
  marginBottom: "clamp(1.5rem, 5vmin, 3rem)",
}));

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

export { Box, StyledLink };
