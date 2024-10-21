'use client';
import { signupWithGithub } from '@/actions';
import { Button } from './ui/button';
import { GithubIcon } from 'lucide-react';

function LoginWithGithubBtn({ title }: { title: string }) {
  const onClick = async () => {
    await signupWithGithub({ redirectTo: window.origin });
  };
  return (
    <div className="flex justify-center">
      <Button type="button" onClick={onClick} variant={'link'}>
        <GithubIcon />
        {title} with Github
      </Button>
    </div>
  );
}

export default LoginWithGithubBtn;
