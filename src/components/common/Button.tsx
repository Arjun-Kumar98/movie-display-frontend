'use client';
import React from 'react';
import styles from './Button.module.css'; // ✅ import as a module

interface ButtonProps {
  type: 'submit' | 'reset';
  label: string;
  onClick?: () => void;
  className?: string; // optional external class
}

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  onClick,
  className = '',
}) => {
  const buttonClass =
    type === 'submit'
      ? styles['submit-button']
      : styles['cancel-button'];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClass} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
