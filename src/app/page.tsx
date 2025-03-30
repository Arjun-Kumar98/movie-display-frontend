'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm/AuthForm';
import { loginUser } from '@/lib/api/auth.api';
import { useRouter } from 'next/navigation';
import { AuthFormData } from '@/components/AuthForm/AuthForm.types';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (formData: AuthFormData) => {
    const result = await loginUser({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.userId);
      alert('Login successful');
      router.push('/movieList');
    } else {
      alert(result.error || 'Login failed');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
