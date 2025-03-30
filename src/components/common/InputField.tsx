'use client';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  placeholder = '',
  register,
  hasError = false,
  errorMessage = '',
  className = ''
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`input-field ${hasError ? 'input-error' : ''}`}
      />
      {hasError && (
        <p className="input-error-text">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
