import { ReactElement, ReactNode } from "react";
import { Box, StyledLink } from "./Navbar.style";
import Services from "assets/icons/services.png";
import Staff from "assets/icons/staff.png";

const NavLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <StyledLink to={to}>{children}</StyledLink>
);
const Icon = {};

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
  return (
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
  );
}
