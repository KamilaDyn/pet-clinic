import { ArrowLeft, ArrowRight } from 'react-feather';
interface HeaderProps {
  children: JSX.Element;
  updateMonth: (monthIncrement: number) => void;
}

const Header = ({ children, updateMonth }: HeaderProps) => {
  return (
    <div className='container col-start-1 col-end-8 h-24 justify-self-center pt-16 pb-28'>
      <div className='icon flex justify-around items-center'>
        <button className='bg-sky-800 ' onClick={() => updateMonth(-1)}>
          <ArrowLeft color='white' size={48} className='cursor-pointer' />
        </button>
        {children}
        <button className='bg-sky-800 ' onClick={() => updateMonth(1)}>
          <ArrowRight color='white' size={48} className='cursor-pointer' />
        </button>
      </div>
    </div>
  );
};

export default Header;
