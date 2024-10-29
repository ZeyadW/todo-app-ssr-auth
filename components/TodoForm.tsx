import {Button} from './ui/button';
import {Input} from './ui/input';
import {addTodo} from '@/actions';

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
