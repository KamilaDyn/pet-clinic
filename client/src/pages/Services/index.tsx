import { ReactElement } from "react";
import { useServices } from "./useServices";
import { Card, Header } from "components/common";
import { FlexOuter, Title } from "./Services.style";
import { FlexBox } from "shared/StyledComponents";

export default function Services(): ReactElement {
  const services = useServices();

  return (
    <div>
      <Header title="Available Services for your animal" />
      <FlexOuter>
        <FlexBox>
          {services.map(({ id, image, name, description }) => (
            <Card
              key={id}
              imgSrc={image.platformLink}
              title={name}
              author={image.authorName}
              platformName={image.platformName}
              content={description}
              platformLink={image.platformLink}
            />
          ))}
        </FlexBox>
      </FlexOuter>
    </div>
  );
}
