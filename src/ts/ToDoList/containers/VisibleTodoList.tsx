import * as React from "react";
import { connect } from "react-redux";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList } from "../components/TodoList";
import * as actions from "../actions/todos";
import { withRouter, RouteComponentProps } from "react-router";
import { getVisibleTodos } from "../configureStore";

export type VisibleTodoListProps = {
    todos: ITodo[];
    filter: TodoFilter;
    toggleTodo: (id: number) => actions.ToggleTodoAction;
    fetchTodos: (filter: TodoFilter) => Promise<ITodo[]>;
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