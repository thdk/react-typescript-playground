import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList } from "../components/TodoList";

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

const mapStateToProps = (state: IAppState) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onTodoClick: (id:string) => dispatch({type: "TOGGLE_TODO", id})
    }
}

export const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);