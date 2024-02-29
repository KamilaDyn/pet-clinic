const CardImg = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img src={src} className=' h-52 w-full object-cover object-top' alt={alt} />
  );
};
export default CardImg;
