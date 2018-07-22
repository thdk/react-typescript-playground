import * as actions from '../actions/todos';
import { ActionTypes as TodoActiontypes } from '../actions/todos';
import { ITodo, TodoFilter } from '../interfaces';
import { Dictionary } from 'lodash';
import { combineReducers, AnyAction } from 'redux';
import { ActionType } from 'typesafe-actions';
import todo from './todo';

type TodoLookUpTable = { [id: number]: ITodo };

export type TodosState = {
    byId: TodoLookUpTable;
    idsByfilter: {
        all: number[],
        active: number[],
        completed: number[]
    }
}

const allIds = (state: number[] = [], action: AnyAction) => {
    switch (action.type) {
        case TodoActiontypes.RECEIVE_TODOS: {
            return action.response.map((todo: ITodo) => todo.id);
        }
        default:
            return state;
    }
}

const activeIds = (state: number[] = [], action: AnyAction) => {
    switch (action.type) {
        case TodoActiontypes.RECEIVE_TODOS:
            if (action.filter !== "active") return state;
            return action.response.map((todo: ITodo) => todo.id);
        default:
            return state;
    }
}

const completedIds = (state: number[] = [], action: AnyAction) => {
    switch (action.type) {
        case TodoActiontypes.RECEIVE_TODOS:
            if (action.filter !== "completed") return state;
            return action.response.map((todo: ITodo) => todo.id);
        default:
            return state;
    }
}

export const byId = (state: TodoLookUpTable = {}, action: actions.Action) => {
    switch (action.type) {
        case TodoActiontypes.RECEIVE_TODOS: {
            const nextState = { ...state };
            action.response.forEach((todo: ITodo) => {
                nextState[todo.id] = todo;
            });
            return nextState;
        }
        default:
            return state;
    }
}

const idsByfilter = combineReducers({
    all: allIds,
    active: activeIds,
    completed: completedIds
});

const todos = combineReducers({
    byId,
    idsByfilter
});

export const getVisibleTodos = (state: TodosState, filter: TodoFilter) => {
    const ids = state.idsByfilter[filter];
    return ids.map(id => state.byId[id]);
}

export default todos;