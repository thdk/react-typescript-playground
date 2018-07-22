import React from 'react';
import {applyMiddleware} from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { visibilityFilter } from './reducers';
import todos, * as fromTodos from './reducers/todos';
import { combineReducers, createStore, Store, Action } from 'redux';
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
    const middlewares = [];
    middlewares.push(promise);
    middlewares.push(createLogger);
    return createStore(todos, applyMiddleware(...middlewares))
}

const TodoApp = () =>
    <div>
        <AddTodo />
        <VisibleTodoList someExtraProp={"This is typed"} />
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