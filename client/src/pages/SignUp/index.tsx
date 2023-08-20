import { Header, InputLabel } from "components/common";
import { Button, Card, Wrapper } from "pages/shared";
import { ChangeEvent, useState } from "react";

function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }
  return (
    <Wrapper>
      <Header title="Create new account" />
      <Card>
        <form>
          <InputLabel
            name="name"
            label="Name"
            type="text"
            handleChange={handleChange}
          />
          <InputLabel
            name="email"
            label="Email"
            type="text"
            handleChange={handleChange}
          />

          <InputLabel
            name="password"
            label="Password"
            type="password"
            handleChange={handleChange}
          />

          <InputLabel
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            handleChange={handleChange}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default SignUp;
