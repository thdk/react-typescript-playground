import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList, TodoListProps } from "../components/TodoList";

const getVisibleTodos = (todos: ITodo[] | undefined, filter: TodoFilter) => {
    if (!todos)
        return [];

    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
    }
}

type StateToPropsType = Pick<TodoListProps, "todos">;
const mapStateToProps = (state: IAppState) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

type DispatchToPropsType = Pick<TodoListProps, "onTodoClick">;
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onTodoClick: (id: number) => dispatch({ type: "TOGGLE_TODO", id })
    }
}

export const VisibleTodoList = connect<StateToPropsType, DispatchToPropsType, {}, IAppState>(mapStateToProps, mapDispatchToProps)(TodoList);