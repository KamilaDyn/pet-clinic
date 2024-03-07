import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/auth/useAuth';
import { useLoginData } from '@/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export interface UserData {
  email: string;
  password: string;
}

const useSignIn = () => {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
  });
  const { signin } = useAuth();
  const { userId } = useLoginData();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userId) {
  //     navigate(`/user/${userId}`);
  //   }
  // }, [userId, navigate]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(values: UserData) {
    signin(values.email, values.password);
  }

  return { handleChange, handleSubmit, userData };
};

export { useSignIn };
