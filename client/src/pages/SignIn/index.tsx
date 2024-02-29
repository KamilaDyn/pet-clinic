import { Input } from '@/common/molecules';
import { useSignIn, UserData } from './useSignIn';
import { Button, Title } from '@/common/atoms';
import { Form, Formik, Field, FormikProps, FormikHelpers } from 'formik';

const SignIn = () => {
  const { handleChange, handleSubmit } = useSignIn();
  const { userData } = useSignIn();

  return (
    <>
      {/* <div className=' container min-w-full min-h-screen bg-background flex flex-col gap-3 justify-center items-center text-rose-900 font-bold'> */}

      <div className=' container min-w-full min-h-screen  flex  gap-3 justify-center items-center text-sky-950 font-bold bg-gradient-to-r bg-gradient-to-r from-slate-300 to-slate-400 '>
        <div className='content  '>
          <Title>Login</Title>
          <div className='form '>
            <Formik
              className='form flex flex-col justify-center items-end'
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(
                values: UserData,
                { setSubmitting }: FormikHelpers<UserData>
              ) => {
                setTimeout(() => {
                  handleSubmit(values);
                  // alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}
            >
              {(props: FormikProps<any>) => (
                <Form className='container py-6 flex flex-col justify-center items-end'>
                  <div className='inputs pb-4'>
                    <Input
                      type='text'
                      name='email'
                      label='Username'
                      value={props.values.email}
                      // handleChange={handleChange}
                    />
                    <Input
                      name='password'
                      type='password'
                      label='Password'
                      value={props.values.password}
                      // handleChange={handleChange}
                    />
                  </div>

                  <Button text='Login' />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {/* <div className='h-full w-full absolute top-0 left-0 bg-gray-800 opacity-40'></div> */}
    </>
  );
};

export default SignIn;
