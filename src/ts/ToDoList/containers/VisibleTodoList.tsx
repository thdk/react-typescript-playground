import * as React from "react";
import { connect } from "react-redux";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList, TodoListProps } from "../components/TodoList";
import * as actions from "../actions/todos";
import { Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import { getVisibleTodos } from "../configureStore";
import { TodosState } from "../reducers/todos";
import { fetchTodos } from '../api';

export type VisibleTodoListProps = {
    todos: ITodo[];
    filter: TodoFilter;
    toggleTodo: (id: number) => actions.ToggleTodoAction;
    receiveTodos: (filter: TodoFilter, todos: ITodo[]) => actions.ReceiveTodosAction;
}

class _VisibleTodoList extends React.Component<VisibleTodoListProps> {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps: VisibleTodoListProps & { filter: TodoFilter }) {
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
        const {toggleTodo, ...rest} = this.props;
        return <TodoList {...rest} onTodoClick={toggleTodo} />;
    }
}

interface ConnectedVisibleTodoListProps extends RouteComponentProps<VisibleTodoListProps> {
    someExtraProp: string;
}

const mapStateToProps = (state: IAppState, ownProps: ConnectedVisibleTodoListProps) => {
    const filter = ownProps.match.params.filter || "all";
    return {
        todos: getVisibleTodos(state,
            filter),
        filter
    }
};

export const VisibleTodoList = withRouter(connect(mapStateToProps, actions)(_VisibleTodoList));