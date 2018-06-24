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
import { VisibleTodoList } from './components/VisibleTodoList';

// todo: move to test script command
runAllTests();

// always name the reducers after the state key they manage
const todoApp = combineReducers<IAppState>({
    todos,
    visibilityFilter
});

const store = createStore(todoApp);

const TodoApp = () =>
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>

ReactDom.render(
    <TodoApp />,
    document.getElementById("app2")
);