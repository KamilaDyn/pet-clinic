import { Field } from 'formik';
import { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  label: string;
  name: string;
  value?: string;
  // handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({ type, label, name, value }: InputProps) => {
  return (
    <div className='py-2 mt-2 text-neutral-800 flex gap-3 justify-center items-center w-full'>
      <label className='text-lg'>{label}: </label>
      <Field
        className='bg-neutral-50 text-lg p-2 rounded-lg w-2/4'
        id={name}
        name={name}
        type={type}
        value={value ?? ''}
        // handleChange={handleChange}
      />
    </div>
  );
};

export default Input;
