import PropTypes from 'prop-types';
import React from 'react';

type TButton = {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<TButton> = ({ children, type, onClick, disabled, className }) => (
  <>
    <button
      className={`text-white py-2 px-2 rounded-md active:bg-gray-400 focus:outline-none ${
        disabled ? 'bg-opacity-30 cursor-not-allowed' : className ? '' : 'bg-opacity-60'
      }${className ? ' ' + className : ' mt-2 bg-gray-600 w-full'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  </>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf<'button' | 'submit' | 'reset' | undefined>(['button', 'submit', 'reset', undefined]).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
