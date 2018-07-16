import { ActionTypes as TodoActiontypes, Action as TodoAction, AddTodoAction, Action, ToggleTodoAction } from '../actions/todos';
import { ITodo, TodoFilter } from '../interfaces';
import { Dictionary } from 'lodash';
import { combineReducers, AnyAction } from 'redux';
import todo from './todo';

type TodoLookUpTable = {[id: number] : ITodo};

export type TodosState = {
    byId: TodoLookUpTable;
    allIds: number[];
}

const allIds = (state: number[] = [], action: Action) => {
    switch (action.type) {
        case TodoActiontypes.ADD_TODO: {
            return [...state, action.id];
        }
        default:
            return state;
    }
}

export const byId = (state: TodoLookUpTable = {}, action: Action) => {
    switch (action.type) {
        case TodoActiontypes.ADD_TODO:
        case TodoActiontypes.TOGGLE_TODO:
            return {
                ...state,
                [action.id]: todo(state ? state[action.id] : undefined, action)
            };
        default:
            return state;
    }
}

const todos = combineReducers({
    byId,
    allIds
});

const getAllTodos = (state: TodosState): ITodo[] => {
    return state.allIds.map(id => state.byId[id]);
}

export const getVisibleTodos = (state: TodosState, filter: TodoFilter) => {
    if (!state)
        return [];

    const allTodos = getAllTodos(state);
    switch (filter) {
        case 'all':
            return allTodos;
        case 'active':
            return allTodos.filter(t => !t.completed);
        case 'completed':
            return allTodos.filter(t => t.completed);
        default:
            return allTodos;
    }
}

export default todos;