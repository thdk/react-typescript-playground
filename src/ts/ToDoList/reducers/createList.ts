import { TodoFilter, ITodo } from "../interfaces";
import { Action, ActionTypes as TodoActiontypes } from "../actions/todos";
import { combineReducers, AnyAction } from "redux";

const createList = (filter: TodoFilter) => {
    const ids = (state: number[] = [], action: Action) => {
        switch (action.type) {
            case TodoActiontypes.RECEIVE_TODOS: {
                if (action.filter !== filter) return state;

                return action.response.map((todo: ITodo) => todo.id);
            }
            default:
                return state;
        }
    }

    const isFetching = (state = false, action: Action) => {
        if ((action as AnyAction).filter !== filter) return state;
        switch (action.type) {
            case TodoActiontypes.REQUEST_TODOS:
                return true;
            case TodoActiontypes.RECEIVE_TODOS:
                return false;
            default:
                return state;
        }
    }

    return combineReducers({ ids, isFetching });
}

export default createList;

export const getIds = (state: {ids: number[], isFetching: boolean}) => {
    return state.ids;
};

export const getIsFetching = (state: {ids: number[], isFetching: boolean}) => {
    return state.isFetching;
}