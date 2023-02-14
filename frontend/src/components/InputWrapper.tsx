import React from 'react';

export type InputWrapperProps = {
  id: string;
  label?: string;
  isError?: boolean;
  error?: string;
  children: React.ReactNode;
};

function InputWrapper({ ...props }: InputWrapperProps) {
  return (
    <div className='mb-2 flex flex-col'>
      <label
        htmlFor={props.id}
        className='block text-sm font-medium text-gray-700 dark:text-gray-200'
      >
        {props.label}
      </label>
      {props.children}
      {props.isError && <p className='text-red-500'>{props.error}</p>}
    </div>
  );
}

export default InputWrapper;
