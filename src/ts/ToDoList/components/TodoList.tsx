import * as React from 'react';
import { ITodo } from '../interfaces';
import { Todo } from '../components/Todo';

export type TodoListProps = {
    todos?: ITodo[] | undefined;
    onTodoClick?: (id: number) => void
}

export const TodoList = ({ todos, onTodoClick }: TodoListProps) => {
    return (
        <ul>
            {todos!.map((todo: any) =>
                <Todo key={todo.id} onClick={() => onTodoClick!(todo.id)} {...todo} />
            )}
        </ul>
    )
}