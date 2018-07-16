import * as React from "react";
import { connect } from "react-redux";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList, TodoListProps } from "../components/TodoList";
import { toggleTodo } from "../actions/todos";
import { Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { getVisibleTodos } from "../configureStore";
import { TodosState } from "../reducers/todos";

interface VisibleTodoListProps extends RouteComponentProps<{filter: TodoFilter}> {
    someExtraProp:string;
}

type StateToPropsType = Pick<TodoListProps, "todos">;
const mapStateToProps = (state: IAppState, ownProps: VisibleTodoListProps) => ({
        todos: getVisibleTodos(state,
            ownProps.match.params.filter || "all")
});

export const VisibleTodoList = withRouter(connect(mapStateToProps, {onTodoClick: toggleTodo})(TodoList));