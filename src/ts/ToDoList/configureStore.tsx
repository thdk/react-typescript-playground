import React from 'react';
import { visibilityFilter } from './reducers';
import todos, * as fromTodos from './reducers/todos';
import { combineReducers, createStore, Store } from 'redux';
import { IAppState, TodoFilter, ITodo } from './interfaces';
import { AddTodo } from './containers/AddTodo';
import { VisibleTodoList } from './containers/VisibleTodoList';
import { Footer } from './components/Footer';
import { Provider } from 'react-redux';
import { Route, Router, withRouter } from "react-router";
import throttle from 'lodash/throttle';
import createHistory from 'history/createBrowserHistory';

// always name the reducers after the state key they manage
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const configureStore = () => {
    const store = createStore(todos);

    // store.subscribe(throttle(() => {
    //     saveState({
    //         todos: store.getState().todos,
    //         visibilityFilter: "all"
    //     }),
    //         1000
    // }))

    return store;
}

const TodoApp = () =>
    <div>
        <AddTodo />
        <VisibleTodoList someExtraProp={"This is typed"}/>
        <Footer />
    </div>

const history = createHistory();

export const Root = ({ store }: any) => {
    return (
        <Provider store={createStore(todoApp)} >
            <Router history={history}>
                <Route path="/:filter?" component={TodoApp} />
            </Router>
        </Provider>
    );
};

// TODO: use local storage to receive 'persited' state
const loadState = () => {
    const x: Map<number, ITodo> = new Map();
    return x;
}

const saveState = (state: IAppState) => {
    // TODO: save state in local storage
}

export const getVisibleTodos = (state: IAppState, filter: TodoFilter) => {
    return fromTodos.getVisibleTodos(state.todos, filter);
}