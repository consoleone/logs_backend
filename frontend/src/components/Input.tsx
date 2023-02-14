import React from 'react';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  inputSize?: 'sm' | 'md' | 'lg';
};

function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full
        px-3
        py-2
        border
        border-gray-300
        rounded-md
        focus:outline-none
        focus:ring-2
        focus:ring-border-primary
        focus:border-transparent
        placeholder-gray-400
        transition
        duration-150
        ease-in-out
        ${
          props.inputSize === 'sm'
            ? 'text-sm'
            : props.inputSize === 'lg'
            ? 'text-lg'
            : 'text-base'
        }
        ${props.className}
        `}
    />
  );
}

export default Input;
