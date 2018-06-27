import { TodoFilter, ITodo } from "./interfaces";

import {ActionTypes as TodoActiontypes, Action as TodoAction } from './actions/todos';
import {Actiontypes as VisibilityFilterActionTypes, Action as VisibilityFilterAction } from "./actions/visibilityfilter";

export const todo = (state: ITodo | undefined, action: TodoAction): ITodo => {
    switch (action.type) {
        case TodoActiontypes.ADD_TODO:
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case TodoActiontypes.TOGGLE_TODO:
            if (!state)
                throw "Cannot toggle the Todo as it's undefined.";

            if (state.id !== action.id) {
                console.log(`${action.id} ${state.id}`);
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
    }
}

export const todos = (state: ITodo[] = [], action: any): ITodo[] => {
    switch (action.type) {
        case 'ADD_TODO':
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

export const visibilityFilter = (state: TodoFilter = 'SHOW_ALL', action: VisibilityFilterAction): TodoFilter => {
    switch (action.type) {
        case VisibilityFilterActionTypes.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}