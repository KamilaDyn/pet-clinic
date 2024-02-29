export default function Title({ children }: { children: string }) {
  return (
    <h1 className='text-4xl font-bold z-10 text-sky-900 pb-3 '>{children}</h1>
  );
}
