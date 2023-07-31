import { Title } from "./Header.style";
export default function Header({ title }: { title: string }) {
  return (
    <header>
      <Title>{title}</Title>
    </header>
  );
}
