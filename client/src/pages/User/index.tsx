import { useEffect } from 'react';
import { Button, Subtitle } from '@/common/atoms';
import { Card, Input } from '@/common/molecules';
import { Form, Formik, FormikProps } from 'formik';
import { useUser } from '@/common/user/useUser';
import { useInfoUser } from './useInfoUser';
import { useNavigate } from 'react-router-dom';
import { useLoginData } from '@/auth/AuthContext';

interface FormValues {
  name: string;
  address: string;
  phone: string;
}
const User = () => {
  const { user } = useUser();
  const { userId } = useLoginData();
  const editUser = useInfoUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
    }
  }, [userId, navigate]);

  if (!user) {
    return null;
  }
  const initialValues = {
    name: user?.name || '',
    address: user?.address || '',
    phone: user?.phone || '',
  };

  return (
    <div className='container flex  justify-center  w-10/12 mx-auto py-16 '>
      <div className='user-account w-full flex flex-col justify-center items-center gap-6'>
        <Subtitle>User account information</Subtitle>
        <Card title='Information'>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values: FormValues, actions) => {
              editUser({ ...user, ...values });
              actions.setSubmitting(false);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form className='flex flex-col gap-2 justify-center items-center'>
                <Input
                  name='name'
                  label='Name'
                  type='text'
                  value={props.values.name}
                />
                <Input
                  name='address'
                  label='Address'
                  type='text'
                  value={props.values.address}
                />
                <Input
                  name='phone'
                  label='Phone'
                  type='text'
                  value={props.values.phone}
                />

                <Button text='Submit' />
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default User;
