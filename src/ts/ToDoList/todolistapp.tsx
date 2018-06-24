import 'redux';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { createStore, combineReducers } from "redux";

import { ITodo, IAppState, TodoFilter } from './interfaces'
import { todos, visibilityFilter } from './reducers';
import { runAllTests } from './tests';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
import { Footer } from './components/Footer';
import { Link } from './components/FilterLink';

// todo: move to test script command
runAllTests();

// always name the reducers after the state key they manage
const todoApp = combineReducers<IAppState>({
    todos,
    visibilityFilter
});

const store = createStore(todoApp);

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

let nextTodoId = 0;
// container component
const TodoApp = ({ todos, visibilityFilter }: IAppState) => {
    return (
        <div>
            <AddTodo onAddClick={todo =>
                store.dispatch({
                    type: 'ADD_TODO',
                    text: todo,
                    id: nextTodoId++
                })} />
            <TodoList todos={getVisibleTodos(todos, visibilityFilter)} onTodoClick={id =>
                store.dispatch({
                    type: 'TOGGLE_TODO', id
                })
            } />
            <Footer />
        </div>
    )
}

type FilterLinkProps = {
    filter: TodoFilter;

}

export class FilterLink extends React.Component<FilterLinkProps, {}> {
    private unsubscribe?: () => void;
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmout() {
        if(this.unsubscribe)
            this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();

        return <Link active={props.filter === state.visibilityFilter}
            onClick={(e) => {
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter: props.filter
                });
            }} >{props.children}</Link>
    }
}
const render = () => {
    ReactDom.render(
        <TodoApp {...store.getState() } />,
        document.getElementById("app2")
    );
}

store.subscribe(render);
render();