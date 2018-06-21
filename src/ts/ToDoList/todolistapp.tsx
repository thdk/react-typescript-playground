import 'redux';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { createStore, combineReducers } from "redux";

import deepFreeze from "deep-freeze";

import expect from "expect";

interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

interface IAppState {
    todos: ITodo[];
    visibilityFilter: TodoFilter
}

const todo = (state: ITodo | undefined, action: any) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case "TOGGLE_TODO":
            console.log(state);
            console.log(action);
            if (!state)
                throw "Cannot toggle the Todo as it's undefined.";

            if (state.id !== action.id) {
                console.log(`${action.id} ${state.id}`);
                return state;
            }

            const newState = {
                ...state,
                completed: !state.completed
            };
            console.log("new state");
            console.log(newState);
            return newState;
        default:
            throw `${action.type} is not implemented`;
    }
}

const todos = (state: ITodo[] = [], action: any): ITodo[] => {
    console.log(action);
    switch (action.type) {
        case 'ADD_TODO':
            state.concat()
            return [
                ...state,
                todo(undefined, action)
            ];
        case "TOGGLE_TODO":
            return state.map(t => todo(t, action));
        default:
            return state;
    }
}

const visibilityFilter = (state: TodoFilter = 'SHOW_ALL', action: any): TodoFilter => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

// always name the reducers after the state key they manage
const todoApp = combineReducers<IAppState>({
    todos,
    visibilityFilter
});

const store = createStore(todoApp);

const testAddTodo = () => {
    const stateBefore: ITodo[] = [];
    const action = {
        type: "ADD_TODO",
        id: 0,
        text: 'Learn Redux',
        completed: false
    };
    const stateAfter: ITodo[] = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
}

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: "Learn redux",
            completed: false
        },
        {
            id: 1,
            text: "Go shopping",
            completed: false
        }
    ];

    const stateAfter = [
        {
            id: 0,
            text: "Learn redux",
            completed: false
        },
        {
            id: 1,
            text: "Go shopping",
            completed: true
        }
    ];

    const action = {
        type: "TOGGLE_TODO",
        id: 1
    };

    expect(todos(stateBefore, action)
    )
        .toEqual(stateAfter);
}

testAddTodo();
testToggleTodo();
console.log("All test passed.");

type TodoFilter = "SHOW_ALL" | "SHOW_ACTIVE" | "SHOW_COMPLETED";

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

type TodoProps = {
    onClick: () => void;
    completed: boolean;
    text: string;
}
const Todo = ({ onClick, completed, text }: TodoProps) => {
    const todoStyle = {
        textDecoration: completed ? "line-through" : "none"
    };

    return (
        <li onClick={onClick} style={todoStyle}>
            {text}
        </li>);
}

type TodoListProps = {
    todos: ITodo[];
    onTodoClick: (id: number) => void
}

const TodoList = ({ todos, onTodoClick }: TodoListProps) => {
    return (
        <ul>
            {todos.map(todo =>
                <Todo key={todo.id} onClick={() => onTodoClick(todo.id)} {...todo} />
            )}
        </ul>
    )
}

let nextTodoId = 0;
class TodoApp extends React.Component<IAppState> {
    private input?: HTMLInputElement;
    render() {
        const {
            todos,
            visibilityFilter
        } = this.props;

        const visibleTodos = getVisibleTodos(this.props.todos, this.props.visibilityFilter);
        return (
            <div>
                <input ref={node => {
                    this.input = node ? node : undefined;
                }} />
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input ? this.input.value : '',
                        id: nextTodoId++
                    });

                    if (this.input)
                        this.input.value = '';
                }}>
                    Add todo
                </button>
                <TodoList todos={visibleTodos} onTodoClick={id =>
                    store.dispatch({ type: 'TOGGLE_TODO', id })
                } />
                <p>
                    Show:
                    <FilterLink
                        filter="SHOW_ALL"
                        currentFilter={visibilityFilter}
                    >
                        All
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter="SHOW_ACTIVE"
                        currentFilter={visibilityFilter}
                    >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter="SHOW_COMPLETED"
                        currentFilter={visibilityFilter}
                    >
                        Completed
                    </FilterLink>
                </p>
            </div>
        )
    }
}

class FilterLink extends React.Component<{ filter: TodoFilter, currentFilter: TodoFilter }>  {
    render() {
        if (this.props.filter === this.props.currentFilter) {
            return <span>{this.props.children}</span>;
        }

        return (
            <a href='#'
                onClick={e => {
                    e.preventDefault();
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: this.props.filter
                    });
                }}
            >
                {this.props.children}
            </a>
        );
    }
}

const render = () => {
    ReactDom.render(
        <TodoApp {...store.getState()} />,
        document.getElementById("app2")
    );
}

store.subscribe(render);
render();