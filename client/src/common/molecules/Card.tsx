export default function Card({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) {
  return (
    <>
      <div className='container relative content pb-8 rounded-xl overflow-hidden max-w-3xl w-full '>
        <div className='relative h-14 bg-blue-100 w-full  z-20 header '>
          <h2 className=' text-sky-700 font-bold text-xl leading-10'>
            {title}
          </h2>
        </div>
        <div className='relative card-content z-10'>{children}</div>{' '}
        <div className='absolute top-0 left-0 opacity-80 bg-white w-full h-full'></div>
      </div>
    </>
  );
}
