import { FormEvent } from 'react';
interface ButtonProps {
  text: string;
  handleClick?: (e?: FormEvent<Element>) => void;
}
const Button = ({ text, handleClick }: ButtonProps) => {
  return (
    <button
      onClick={handleClick ? (e) => handleClick(e) : undefined}
      className='rounded-md shadow-md text-xl text-gray-50 bg-sky-800 cursor-pointer z-10 w-4/6 max-w-36'
    >
      {text}
    </button>
  );
};

export default Button;
