interface CardProps {
  imgSrc: string;
  title: string;
  content: string | string[];
  author: string;
  platformName: string;
  platformLink: string;
}
import Image from "../Image";
import { Link } from "react-router-dom";
import { CardWrapper, Content, Figure, Title, Span } from "./Card.style";

export default function Card({
  imgSrc,
  title,
  content,
  author,
  platformName,
  platformLink,
}: CardProps) {
  return (
    <CardWrapper>
      <Figure>
        <Image src={imgSrc} alt={title} />
      </Figure>
      <Span>
        Photo by {author} from <Link to={platformLink}>{platformName}</Link>
      </Span>
      <div>
        <Title>{title}</Title>
        {typeof content === "string" ? (
          <Content>{content}</Content>
        ) : (
          <Content>
            Specialist: {content.map((value) => value).join(", ")}
          </Content>
        )}
      </div>
    </CardWrapper>
  );
}
