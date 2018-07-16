import * as React from "react";
import { connect } from "react-redux";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList, TodoListProps } from "../components/TodoList";
import { toggleTodo } from "../actions/todos";
import { Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { getVisibleTodos } from "../configureStore";
import { TodosState } from "../reducers/todos";
import { fetchTodos } from '../api';


class VisibleTodoList2 extends React.Component<TodoListProps & { filter: TodoFilter }> {
    componentDidMount() {
        fetchTodos(this.props.filter).then(todos => {
            console.log(this.props.filter, todos)
        });
    }

    componentDidUpdate(prevProps: TodoListProps & { filter: TodoFilter }) {
        if (this.props.filter !== prevProps.filter) {
            fetchTodos(this.props.filter).then(todos => {
                console.log(this.props.filter, todos)
            });
        }
    }

    render() {
        return <TodoList {...this.props} />;
    }

}

interface VisibleTodoListProps extends RouteComponentProps<{ filter: TodoFilter }> {
    someExtraProp: string;
}

type StateToPropsType = Pick<TodoListProps, "todos">;
const mapStateToProps = (state: IAppState, ownProps: VisibleTodoListProps) => {
    const filter = ownProps.match.params.filter || "all";
    return {
        todos: getVisibleTodos(state,
            filter),
        filter
    }
};

export const VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(VisibleTodoList2));