import React from 'react';

export type IconButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

function IconButton({ ...props }: IconButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`p-2 rounded-md bg-cyan-600 ${props.className}`}
    >
      {props.children}
    </button>
  );
}

export default IconButton;
