import * as React from "react";
import { connect } from "react-redux";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList, TodoListProps } from "../components/TodoList";
import { toggleTodo, receiveTodos } from "../actions/todos";
import { Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { getVisibleTodos } from "../configureStore";
import { TodosState } from "../reducers/todos";
import { fetchTodos } from '../api';


class VisibleTodoList2 extends React.Component<TodoListProps & { filter: TodoFilter, receiveTodos: (filter: TodoFilter, todos: ITodo[]) => any }> {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps: TodoListProps & { filter: TodoFilter }) {
        if (this.props.filter !== prevProps.filter) {
           this.fetchData();
        }
    }

    fetchData() {
        const {filter, receiveTodos} = this.props;
        fetchTodos(filter).then(todos => {
            this.props.receiveTodos(filter, todos)
        });
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

export const VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo, receiveTodos })(VisibleTodoList2));