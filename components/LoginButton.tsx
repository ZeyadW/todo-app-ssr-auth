'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

function LoginButton() {
  const router = useRouter();
  const onLogin = async () => {
    router.push('/login');
  };
  return (
    <Button size={'sm'} onClick={onLogin}>
      Sign In
    </Button>
  );
}

export default LoginButton;
