import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="w-full h-screen flex mt-10 justify-center container mx-auto px-4 ">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col items-start">
            <h4>Welcome,</h4>
            <h4> {user?.email || 'Guest'}</h4>
          </div>
          {user ? <LogoutButton /> : <LoginButton />}
        </div>

        <div className="flex flex-col gap-4  ">
          {user ? <TodoForm /> : null}

          <TodoList />
        </div>
      </div>
    </div>
  );
}
