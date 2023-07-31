import { ReactElement } from "react";
import { StyledImage } from "./Image.style";

interface ImageProps {
  src: string;
  alt: string;
}

export default function Image({ src, alt }: ImageProps): ReactElement {
  return <StyledImage src={src} alt={alt} />;
}
