import * as React from "react";
import { connect } from "react-redux";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList } from "./TodoList";

const getVisibleTodos = (todos: ITodo[], filter: TodoFilter) => {
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTodoClick: (id:string) => dispatch({type: "TOGGLE_TODO", id})
    }
}

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);