import LoginForm from '@/components/login-form';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="md:w-1/3 min-h-screen mx-auto flex flex-col justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500">
          Enter username for login to your account
        </p>
      </div>
      <div className="mt-6">
        <LoginForm />
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link className="underline" href="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}