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
import createHistory from 'history/createBrowserHistory';

// always name the reducers after the state key they manage
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const configureStore = () => {
    const store = createStore(todos);
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

export const getVisibleTodos = (state: IAppState, filter: TodoFilter) => {
    return fromTodos.getVisibleTodos(state.todos, filter);
}