'use client';
import { useQueryClient } from '@tanstack/react-query';

import { TodoItem } from './TodoItem';
import { Spinner } from './ui/Spinner';
import { useQueryTodos } from '@/hooks/useTodos';
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export const TodoList = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { data: todos, isLoading, error } = useQueryTodos();

  useEffect(() => {
    const channel = supabase
      .channel('todos')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        payload => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
          console.log('Change received!', payload);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) return <Spinner show />;

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold">Todo List</h1>

      {todos?.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <div className="flex flex-col gap-2">
          {todos?.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};
