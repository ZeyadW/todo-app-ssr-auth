'use client';
import LoginWithGithubBtn from '@/components/LoginWithGithubBtn';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LoginForm } from '@/types/auth';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/actions';

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const onSubmit = (data: LoginForm) => {
    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('password', data.password);

    login(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              {...register('email', { required: 'Email is required' })}
              type="text"
              placeholder="Username"
            />
            {errors.email && <span>{errors.email.message}</span>}
            <Input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          {message && (
            <p className="text-red-500">{decodeURIComponent(message)}</p>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button
              type="button"
              variant={'link'}
              onClick={() => router.push('/register')}
            >
              {'Don’t have an account? Sign Up'}
            </Button>

            <SubmitButton />
            <LoginWithGithubBtn title="Login" />
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Login;

const SubmitButton = () => {
  return (
    <Button type="submit" className="w-full">
      Login
    </Button>
  );
};
