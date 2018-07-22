import { TodoLookUpTable } from ".";
import { ActionTypes as TodoActiontypes } from '../actions/todos';
import * as actions from '../actions/todos';
import { ITodo } from "../interfaces";

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

export default byId;

export const getTodo = (state: TodoLookUpTable, id: number) => {
    return state[id];
}