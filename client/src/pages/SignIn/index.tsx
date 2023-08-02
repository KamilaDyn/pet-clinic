import { Header, InputLabel } from "components/common";
import { Box, Button, Card, Wrapper } from "./SignIn.style";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "auth/useAuth";

interface UserData {
  email: string;
  password: string;
}
export default function SignIn() {
  const { signUserIn } = useAuth();

  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }
  function submitHandler(e: FormEvent) {
    e.preventDefault();
    signUserIn(userData);
  }
  return (
    <Wrapper>
      <Header title="Sign in to your account" />
      <Card>
        <form onSubmit={submitHandler}>
          <InputLabel label="email" type="text" handleChange={handleChange} />
          <InputLabel
            label="password"
            type="password"
            handleChange={handleChange}
          />
          <Button type="submit">Login </Button>
        </form>
        <Box>
          <p>Dont you have account?</p>
        </Box>
        <Button>Sign Up</Button>
      </Card>
    </Wrapper>
  );
}
