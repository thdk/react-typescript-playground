import React from 'react';
import {applyMiddleware, AnyAction, Dispatch} from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todos, * as fromTodos from './reducers';
import { combineReducers, createStore, Store, Action } from 'redux';
import { TodoFilter, ITodo } from './interfaces';
import { AddTodo } from './containers/AddTodo';
import { VisibleTodoList } from './containers/VisibleTodoList';
import { Footer } from './components/Footer';
import { Provider } from 'react-redux';
import { Route, Router, withRouter } from "react-router";
import createHistory from 'history/createBrowserHistory';

const configureStore = () => {
    const middlewares = [];
    middlewares.push(promise);
    middlewares.push(createLogger);
    return createStore(todos, applyMiddleware(...middlewares))
}

const thunk = (store: Store) => (next: Dispatch) => (action: any) => {
    typeof action == "function" ?
    action(store.dispatch, store.getState) :
    next(action);
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
        <Provider store={createStore(todos)} >
            <Router history={history}>
                <Route path="/:filter?" component={TodoApp} />
            </Router>
        </Provider>
    );
};
