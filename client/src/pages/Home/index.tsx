import { ReactElement } from "react";
import { Image } from "components/common";
import BackgroundImage from "assets/background.jpg";
import {
  ImageWrapper,
  TextWrapper,
  Wrapper,
  Text,
  Header,
  Title,
  Logo,
} from "./Home.style";
import LogoImg from "assets/logo.png";

export default function Home(): ReactElement {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={BackgroundImage} alt="background" />
      </ImageWrapper>
      <TextWrapper>
        <Header>
          <Logo>
            <Image src={LogoImg} alt="logo" />
          </Logo>{" "}
          <Title>Pet Clinic</Title>
        </Header>
        <Text>Hours: 24h</Text>
        <Text>Address: Nearby</Text>
      </TextWrapper>
    </Wrapper>
  );
}
