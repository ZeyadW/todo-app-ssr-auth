import { useQuery } from '@tanstack/react-query';

import { useDeleteTodo, useUpdateTodo } from '@/hooks/useTodos';
import { cn } from '@/lib/utils';
import { Todo } from '@/types/todo';
import { Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createClient } from '@/lib/supabase/client';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const supabase = createClient();

  const [open, setOpen] = useState(false);

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
  });

  const updateMutation = useUpdateTodo(todo);
  const deleteMutation = useDeleteTodo(todo);

  const handleToggle = () => {
    updateMutation.mutate({ completed: !todo.completed });
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleEdit = (data: { title: string }) => {
    updateMutation.mutate(
      { title: data.title },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: todo.title,
    },
  });

  if (isLoading)
    return (
      <>
        <Skeleton className="h-[50px] w-full mb-2" />
      </>
    );

  return (
    <div className="flex items-center justify-between border border-neutral-300 min-h-[50px] p-2 rounded">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={
            updateMutation.isPending || currentUser?.id !== todo?.user_id
          }
        />

        <label
          className={cn(
            todo?.completed && 'line-through',
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          )}
        >
          {todo.title}
        </label>
      </div>

      {currentUser?.id === todo?.user_id && (
        <div className="flex space-x-2">
          <Button onClick={() => setOpen(true)} size={'sm'}>
            <Edit2 />
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
              </DialogHeader>

              <Input {...register('title')} />

              <DialogFooter>
                <Button onClick={handleSubmit(handleEdit)} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            size={'sm'}
            className="bg-red-500 text-white hover:bg-red-600 "
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            <Trash2 />
          </Button>
        </div>
      )}
    </div>
  );
};
