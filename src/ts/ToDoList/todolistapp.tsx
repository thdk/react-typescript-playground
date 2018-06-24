import 'redux';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux'; 

import { ITodo, IAppState, TodoFilter } from './interfaces'
import { todos, visibilityFilter } from './reducers';
import { runAllTests } from './tests';
import { AddTodo } from './components/AddTodo';
import { Footer } from './components/Footer';
import { VisibleTodoList } from './components/VisibleTodoList';

// always name the reducers after the state key they manage
const todoApp = combineReducers<IAppState>({
    todos,
    visibilityFilter
});

// todo: move to test script command
runAllTests();

const TodoApp = () =>
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>

ReactDom.render(
    <Provider store={createStore(todoApp)}>
    <TodoApp />
    </Provider>,
    document.getElementById("app2")
);