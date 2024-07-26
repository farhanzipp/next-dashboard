"use client"
import { signInSchema, SignInSchemaProps } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Label } from './ui/label';
import { Input } from './ui/input';
import Link from 'next/link';
import { Button } from './ui/button';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function LoginForm() {
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
    axios.post('https://dummyjson.com/auth/login', {
      username: data.username,
      password: data.password,
    })
      .then(function (response) {
        const data = response.data;
        const token = data.token;
        Cookies.set('token', token, {expires: 3});
        
        // reset();
      })
      .catch(function (error) {
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
      })
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
