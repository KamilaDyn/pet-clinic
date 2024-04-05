import { useAuth } from '@/auth/useAuth';
import { Button } from '../atoms';
import { useUser } from '../user/useUser';
import { Link } from 'react-router-dom';
import { useLoginData } from '@/auth/AuthContext';
const Header = () => {
  const { signout } = useAuth();
  const { userId } = useLoginData();
  const { user } = useUser();

  return (
    <nav className='relative navbar navbar-expand-lg navbar-light bg-light h-14 flex justify-around items-center bg-sky-200 '>
      <a className='navbar-brand' href='/'>
        Pet Clinic
      </a>
      <div className='flex gap-6 justify-around items-center'>
        <ul className='navbar-nav mr-auto flex gap-4'>
          <li className='nav-item'>
            <Link className=' text-sky-950 ' to='/'>
              Appointment
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/staff'>
              Staff
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/calendar'>
              Calendar
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/treatments'>
              Treatments
            </Link>
          </li>
          {user && (
            <>
              <li className='nav-item'>
                <Link className='nav-link' to={`/user/${userId}`}>
                  Account
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={`/user/appointments`}>
                  Appointments
                </Link>
              </li>
            </>
          )}
        </ul>
        {user && <Button text='Logout' handleClick={signout} />}
      </div>
    </nav>
  );
};

export default Header;
