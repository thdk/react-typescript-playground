import * as React from "react";
import { connect } from "react-redux";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList, TodoListProps } from "../components/TodoList";
import { toggleTodo } from "../actions/todos";
import { Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

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
        default:
            return todos;
    }
}

interface VisibleTodoListProps extends RouteComponentProps<{ filter: TodoFilter }> {
    someExtraProp: string;
}

type StateToPropsType = Pick<TodoListProps, "todos">;
const mapStateToProps = (state: IAppState, ownProps: VisibleTodoListProps) => ({
    todos: getVisibleTodos(state.todos,
        ownProps.match.params.filter)
});

type DispatchToPropsType = Pick<TodoListProps, "onTodoClick">;
const mapDispatchToProps = (dispatch: Dispatch) => ({
    onTodoClick(id: number) {
        dispatch(toggleTodo(id));
    }
});

export const VisibleTodoList = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));