import * as actions from '../actions/todos';
import { ActionTypes as TodoActiontypes, Action } from '../actions/todos';
import { ITodo, TodoFilter } from '../interfaces';
import { Dictionary } from 'lodash';
import { combineReducers, AnyAction } from 'redux';
import { ActionType } from 'typesafe-actions';
import todo from './todo';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

export type TodoLookUpTable = { [id: number]: ITodo };

export type TodosState = {
    byId: TodoLookUpTable;
    listByFilter: TodoLookUpTable;
}

const listByFilter = combineReducers({
    all: createList("all"),
    active: createList("active"),
    completed: createList("completed")
});

const todos = combineReducers({
    byId,
    listByFilter
});

export const getVisibleTodos = (state: any, filter: TodoFilter) => {
    const ids = fromList.getIds(state.listByFilter[filter]);
    return ids.map(id => fromById.getTodo(state.byId, id));
}

export const getIsFetching = (state: any, filter: TodoFilter) => {
    return fromList.getIsFetching(state.listByFilter[filter]);
}

export default todos;
