import * as React from "react";
import * as PropTypes from "prop-types";
import { ITodo, TodoFilter, IAppState } from "../interfaces";
import { TodoList } from "./TodoList";

export class VisibleTodoList extends React.Component {
    private unsubscribe?: () => void;

    static contextTypes = {
        store: PropTypes.object
    }

    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmout() {
        if (this.unsubscribe)
            this.unsubscribe();
    }

    getVisibleTodos(todos: ITodo[], filter: TodoFilter) {
        switch (filter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.completed);
            case 'SHOW_COMPLETED':
                return todos.filter(t => t.completed);
        }
    }

    render() {
        const props = this.props;
        const {store} = this.context;
        const state = store.getState();

        return <TodoList todos={this.getVisibleTodos(state.todos, state.visibilityFilter)} onTodoClick={id =>
            store.dispatch({
                type: 'TOGGLE_TODO', id
            })}
        />
    }
}

VisibleTodoList.contextTypes = {
    store: PropTypes.object
}