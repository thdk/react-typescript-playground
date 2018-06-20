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
    visibilityFilter: string
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

const todos = (state: ITodo[] = [], action: any) => {
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

const visibiliyFilter = (state = 'SHOW_ALL', action: any) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

// always name the reducers after the state key they manage
const todoApp = combineReducers({
    todos,
    visibiliyFilter
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

let nextTodoId = 0;
class TodoApp extends React.Component<{ todos: ITodo[] }> {
    private input?: HTMLInputElement;
    render() {
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
                <ul>
                    {
                        this.props.todos.map(todo =>
                            <li key={todo.id} onClick={() => {
                                store.dispatch(
                                    {
                                        type: "TOGGLE_TODO",
                                        id: todo.id
                                    })
                            }} style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                            >
                                {todo.text}
                            </li>)
                    }
                </ul>
            </div>
        )
    }
}

const render = () => {
    ReactDom.render(
        <TodoApp todos={store.getState().todos} />,
        document.getElementById("app2")
    );
}

store.subscribe(render);
render();