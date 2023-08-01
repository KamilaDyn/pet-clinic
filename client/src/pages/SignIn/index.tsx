import { Header, InputLabel } from "components/common";
import { Button, Card, Wrapper } from "./SignIn.style";
export default function SignIn() {
  function submitHandler(e: any) {
    e.preventDefault();

    console.log(e, "submit");
  }
  return (
    <Wrapper>
      <Header title="Sign in to your account" />
      <Card>
        <form onSubmit={submitHandler}>
          <InputLabel label="Email" type="email" />
          <InputLabel label="Password" type="password" />
          <Button type="submit">Login </Button>
        </form>
      </Card>
    </Wrapper>
  );
}
