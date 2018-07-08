import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList, TodoListProps } from "../components/TodoList";
import { toggleTodo } from "../actions/todos";

const getVisibleTodos = (todos: ITodo[] | undefined, filter: TodoFilter) => {
    if (!todos)
        return [];

    switch (filter) {
        case 'all':
            return todos;
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
    }
}

type StateToPropsType = Pick<TodoListProps, "todos">;
const mapStateToProps = (state: IAppState) => ({
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

type DispatchToPropsType = Pick<TodoListProps, "onTodoClick">;
const mapDispatchToProps = (dispatch: Dispatch) => ({
    onTodoClick(id: number) {
        dispatch(toggleTodo(id));
    }
});

export const VisibleTodoList = connect<StateToPropsType, DispatchToPropsType, {}, IAppState>(mapStateToProps, mapDispatchToProps)(TodoList);