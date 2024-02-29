import { Button, Title } from '@/common/atoms';
import { useNavigate } from 'react-router-dom';

import animals from '@/assets/dogandcat.png';
import { useUser } from '@/common/user/useUser';
const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const navigateToLogin = () => {
    navigate('/login');
  };
  return (
    <>
      {/* <div className='relative container min-w-full min-h-screen bg-background flex flex-col gap-3 justify-center items-center text-rose-900 font-bold'> */}
      <div className='relative container min-w-full min-h-screen  flex  gap-3 justify-center items-center text-sky-950 font-bold '>
        <div className='container'>
          <div className='text pb-4'>
            <Title> Pet clinic</Title>
            <h2 className='text-2xl z-10 pb-2'>Hours: 24h</h2>
            <h3 className='text-2xl z-10'>Address: Nearby</h3>
          </div>
          {!user && <Button text='Login' handleClick={navigateToLogin} />}
        </div>
        <div className='img'>
          <img src={animals} alt='animals' />
        </div>
      </div>
      {/* <div className='h-full w-full absolute top-0 left-0 bg-gray-800 opacity-40'></div> */}
    </>
  );
};

export default Home;
