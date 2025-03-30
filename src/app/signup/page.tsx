'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm/AuthForm';
import { signupUser } from '@/lib/api/auth.api';
import { useRouter } from 'next/navigation';
import { AuthFormData } from '@/components/AuthForm/AuthForm.types';

const SignupPage = () => {
  const router = useRouter();

  const handleSignup = async (formData: AuthFormData) => {
    const result = await signupUser({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      alert('Signup successful');
      router.push('/');
    } else {
      alert(result.error || 'Signup failed');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <AuthForm mode="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default SignupPage;
