import * as React from 'react';
import { ITodo } from '../interfaces';
import { Todo } from './Todo';

export type TodoListProps = {
    todos: ITodo[];
    onTodoClick: (id: number) => void
}

export const TodoList = ({ todos, onTodoClick }: TodoListProps) => {
    return (
        <ul>
            {todos.map(todo =>
                <Todo key={todo.id} onClick={() => onTodoClick(todo.id)} {...todo} />
            )}
        </ul>
    )
}