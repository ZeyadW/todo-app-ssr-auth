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

import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { signup } from '@/actions';

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  return (
    <form>
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Register</CardTitle>
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
              {...register('password', {
                required: 'Password is required',
                minLength: 6,
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button
              type="button"
              variant={'link'}
              onClick={() => router.push('/login')}
            >
              {'Already have an account? Sign In'}
            </Button>
            <SubmitButton />
            <LoginWithGithubBtn title="Register" />
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Login;

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      formAction={signup}
      disabled={pending}
      type="submit"
      className="w-full"
    >
      Register
    </Button>
  );
};
