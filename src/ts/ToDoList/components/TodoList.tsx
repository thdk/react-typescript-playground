import * as React from 'react';
import { ITodo, TodoFilter } from '../interfaces';
import { Todo } from '../components/Todo';

export type TodoListProps = {
    todos: ITodo[];
    onTodoClick: (id: number) => void;
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