import { ITodo } from "./interfaces";

import deepFreeze from "deep-freeze";

import expect from "expect";
import { todos } from "./reducers";
import {ActionTypes as TodoActiontypes} from "./actions/todos"

export const runAllTests = () => {
    testAddTodo();
    testToggleTodo();
    console.log("All test passed.");
}

const testAddTodo = () => {
    const stateBefore: ITodo[] = [];
    const action = {
        type: TodoActiontypes.ADD_TODO,
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
        type: TodoActiontypes.TOGGLE_TODO,
        id: 1
    };

    expect(todos(stateBefore, action)
    )
        .toEqual(stateAfter);
}