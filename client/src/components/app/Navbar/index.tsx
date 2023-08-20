import { ReactElement, ReactNode, useContext } from "react";
import { Box, Button, StyledLink, Wrapper } from "./Navbar.style";
import Services from "assets/icons/services.png";
import Staff from "assets/icons/staff.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "pages/SignIn/user/useUser";
import { AuthContext } from "context/user-context";

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

const AuthBtn = () => {
  const { user } = useContext(AuthContext);
  const { logoutUser, isLoading } = useUser();
  const navigate = useNavigate();
  if (isLoading) {
    return null;
  }
  if (user) {
    return <Button onClick={logoutUser}> Logout</Button>;
  }
  return <Button onClick={() => navigate("/sign-in")}> Login</Button>;
};

export default function Navbar(): ReactElement {
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
      {/* {!user && <Button onClick={() => navigate("/sign-in")}>Login</Button>} */}
      {/* <Button onClick={handleAuth}> {user ? "Logout" : "Login"}</Button> */}
      <AuthBtn />
    </Wrapper>
  );
}
