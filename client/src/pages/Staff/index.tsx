import { useStaff } from "./useStaff";
import { Card, Header } from "components/common";
import { FlexBox } from "shared/StyledComponents";
import { Wrapper } from "./Staff.style";

export default function Staff() {
  const staff = useStaff();

  return (
    <Wrapper>
      <Header title="Meet ours staff" />
      <FlexBox>
        {staff.map(({ id, image, name, serviceNames }) => (
          <Card
            key={id}
            imgSrc={image.platformLink}
            title={name}
            content={serviceNames}
            author={image.authorName}
            platformName={image.platformName}
            platformLink={image.platformLink}
          />
        ))}
      </FlexBox>
    </Wrapper>
  );
}
