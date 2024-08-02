"use client"
import { signInSchema, SignInSchemaProps } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form'

import Link from 'next/link';

import axios from 'axios';
import Cookies from 'js-cookie';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<SignInSchemaProps>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = async (data: SignInSchemaProps) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: data.username,
        password: data.password,
      })

      const userData = response.data;
      const userInfo = {
        username : userData.username,
        email : userData.email,
        image : userData.image,
      }

      Cookies.set('token', userData.token, { expires: 3 });
      Cookies.set('user-info', JSON.stringify(userInfo) )
      router.push('/dashboard');

      // reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          setError('root.serverError', {
            type: '400',
            message: error.response.data.message || 'Invalid credentials. Please try again.',
          });
        } else {
          setError('root.serverError', {
            type: '500',
            message: 'An unexpected error occurred. Please try again.',
          });
        }
      } else {
        console.error('error', error);
        setError('root.serverError', {
          type: 'manual',
          message: 'An unexpected error occurred. Please try again.',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="flex flex-col gap-2">
        <div>
          <Label>Username</Label>
          <Input
            {...register("username")}
            type="text"
            placeholder="username"
            autoComplete='true'
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Label>Password</Label>
            <Link className="text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
          <Input
            {...register("password")}
            type="password"
            placeholder='password'
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* general error here */}
        {errors.root?.serverError && (
          <p className="text-sm text-red-500">{errors.root.serverError.message}</p>
        )}

        <Button
          disabled={isSubmitting}
          type="submit"
          className="mt-4 w-full"
        >
          Login
        </Button>
      </div>
    </form>
  )
}
