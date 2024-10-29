import {createClient} from '@/lib/supabase/server';
import {Button} from './ui/button';
import {Input} from './ui/input';
// import {addTodo} from '@/actions';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

interface TodoForm {
  title: string;
}

export const TodoForm: React.FC = () => {
  // const createTodoMutation = useCreateTodo();

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const res = await addTodo(formData);
  //   console.log(res);
  //   formData.reset();
  // };
  async function addTodo(formData: FormData) {
    'use server';

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
    redirect('/?timestamp=' + Date.now());
  }
  return (
    <form action={addTodo}>
      <div className="flex gap-2 ">
        <div className="w-full">
          <Input
            type="text"
            name="title"
            placeholder="New todo"
            key={Math.random()}
          />
        </div>

        <Button type="submit">Add Todo</Button>
      </div>
    </form>
  );
};
