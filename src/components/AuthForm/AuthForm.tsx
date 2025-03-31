'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormData, AuthFormProps } from './AuthForm.types';
import { getAuthFormSchema } from './AuthForm.validation';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { t } from '@/i18n';
import styles from './AuthForm.module.css';

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(getAuthFormSchema(mode)),
  });

  const submitHandler = (data: AuthFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles['auth-form']}>
      <h2 className={styles['form-title']}>{t(`${mode}.title`)}</h2>

      <InputField
        name="email"
        type="email"
        placeholder={t(`${mode}.email`)}
        register={register}
        hasError={!!errors.email}
        errorMessage={errors.email?.message}
      />

      <InputField
        name="password"
        type="password"
        placeholder={t(`${mode}.password`)}
        register={register}
        hasError={!!errors.password}
        errorMessage={errors.password?.message}
      />

      {mode === 'signup' && (
        <InputField
          name="confirmPassword"
          type="password"
          placeholder={t('signup.confirmPassword')}
          register={register}
          hasError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message as string | undefined}
        />
      )}

      <Button
        type="submit"
        label={t(`${mode}.submit`)}
        className="submit-button"
      />
    </form>
  );
};

export default AuthForm;
