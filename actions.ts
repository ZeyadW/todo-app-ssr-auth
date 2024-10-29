'use server';

import {createClient} from '@/lib/supabase/server';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {actionClient} from './lib/safe-action';
import {z} from 'zod';

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const {error} = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/login?message=Could not authenticate user');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        username: formData.get('username') as string,
      },
    },
  };

  const {error} = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}

const schema = z.object({
  redirectTo: z.string(),
});

export const signupWithGithub = actionClient
  .schema(schema)
  .action(async ({parsedInput: {redirectTo}}) => {
    const supabase = createClient();

    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${redirectTo}/auth/callback`,
      },
    });

    if (error) {
      redirect('/error');
    }

    revalidatePath('/', 'layout');
    if (data.url) {
      redirect(data.url);
    }
  });

export const logout = actionClient.action(async () => {
  const supabase = createClient();

  const {error} = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/login');
});

const addTodoSchema = z.object({
  title: z.string(),
});

export const addTodo = async (formData) => {
  const title = formData.get('title');
  const supabase = createClient();
  const {
    data: {user},
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError) throw getUserError;

  const {error: supabaseError} = await supabase
    .from('todos')
    .insert([{title: title, user_id: user?.id}]);

  if (supabaseError) throw supabaseError;

  revalidatePath('/', 'layout');
};
