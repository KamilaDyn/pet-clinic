import { ReactElement, ReactNode } from "react";
import { Box, LoginButton, StyledLink, Wrapper } from "./Navbar.style";
import Services from "assets/icons/services.png";
import Staff from "assets/icons/staff.png";
import { useNavigate } from "react-router-dom";

const NavLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <StyledLink to={to}>{children}</StyledLink>
);

const Img = ({ srcImg }: { srcImg: string }) => {
  return (
    <img
      src={srcImg}
      alt="services"
      width="40px"
      height="40px"
      style={{ marginRight: "10px" }}
    />
  );
};

export default function Navbar(): ReactElement {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Box>
        <NavLink to="/services">
          <Img srcImg={Services} />
          Services
        </NavLink>
        <NavLink to="/staff">
          <Img srcImg={Staff} />
          Staff
        </NavLink>
      </Box>
      <LoginButton onClick={() => navigate("/sign-in")}>Login</LoginButton>
    </Wrapper>
  );
}
