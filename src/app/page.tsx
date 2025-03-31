'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm/AuthForm';
import { useRouter } from 'next/navigation';
import { AuthFormData } from '@/components/AuthForm/AuthForm.types';
import { useAuth } from '../hooks/useAuth';
import { t } from '../i18n';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth(); // ✅ using the hook

  const handleLogin = async (formData: AuthFormData) => {
    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      router.push('/movies');
    } else {
      alert(result.error || t('api.loginFailed'));
    }
  };

  return (
    <div className="auth-page-wrapper">
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
