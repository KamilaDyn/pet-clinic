import { Header, InputLabel } from "components/common";
import { Box } from "./SignIn.style";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { useAuth } from "auth/useAuth";
import { AuthContext } from "context/user-context";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card, Wrapper } from "pages/shared";

interface UserData {
  email: string;
  password: string;
}
export default function SignIn() {
  const { signInMutation } = useAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    email: "test01",
    password: "test123",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }
  function submitHandler(e: FormEvent) {
    e.preventDefault();

    signInMutation(userData);
  }
  if (user) {
    return <Navigate to="/services" />;
  }

  return (
    <Wrapper>
      <Header title="Sign in to your account" />
      <Card>
        <form onSubmit={submitHandler}>
          <InputLabel
            name="email"
            label="Email"
            type="text"
            handleChange={handleChange}
          />
          <InputLabel
            name="Password"
            label="Password"
            type="password"
            handleChange={handleChange}
          />
          <Button type="submit">Login </Button>
        </form>
        <Box>
          <p>Dont you have account?</p>
        </Box>
        <Button onClick={() => navigate("/sign-up")}>Sign Up</Button>
      </Card>
    </Wrapper>
  );
}
