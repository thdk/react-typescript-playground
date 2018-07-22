import * as React from "react";
import { connect } from "react-redux";
import { ITodo, TodoFilter } from "../interfaces";
import { TodoList } from "../components/TodoList";
import * as actions from "../actions/todos";
import { withRouter, RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { TodosState, getVisibleTodos, getIsFetching } from "../reducers";

export type VisibleTodoListProps = {
    todos: ITodo[];
    filter: TodoFilter;
    toggleTodo: (id: number) => actions.ToggleTodoAction;
    fetchTodos: (filter: TodoFilter) => (dispatch: Dispatch, getState: () => {ids: number[], isFetching: boolean}) => void;
    isFetching: boolean;
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
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
    }

    render() {
        const {toggleTodo, todos, isFetching} = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>;
        }
        return <TodoList todos={todos} onTodoClick={toggleTodo} />;
    }
}

interface ConnectedVisibleTodoListProps extends RouteComponentProps<VisibleTodoListProps> {
    someExtraProp: string;
}

const mapStateToProps = (state: TodosState, ownProps: ConnectedVisibleTodoListProps) => {
    const filter = ownProps.match.params.filter || "all";
    return {
        todos: getVisibleTodos(state, filter),
        filter,
        isFetching: getIsFetching(state, filter)
    }
};

export const VisibleTodoList = withRouter(connect(mapStateToProps, actions)(_VisibleTodoList));