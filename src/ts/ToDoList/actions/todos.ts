import { ITodo, TodoFilter } from "../interfaces";
import * as api from "../api/index";
import { Dispatch } from "redux";
import { getIsFetching } from "../reducers";

export enum ActionTypes {
    ADD_TODO,
    TOGGLE_TODO,
    RECEIVE_TODOS,
    REQUEST_TODOS
}

export interface AddTodoAction {
    type: ActionTypes.ADD_TODO;
    id: number;
    text: string;
}

export interface ToggleTodoAction {
    type: ActionTypes.TOGGLE_TODO;
    id: number;
}

export interface RequestTodosAction {
    type: ActionTypes.REQUEST_TODOS;
    filter: TodoFilter;
}

export interface ReceiveTodosAction {
    type: ActionTypes.RECEIVE_TODOS;
    response: ITodo[];
    filter: TodoFilter;
}

export type Action = AddTodoAction |
    ToggleTodoAction |
    RequestTodosAction |
    ReceiveTodosAction;

let nextTodoId = 0;
export const addTodo = (name: string): AddTodoAction => ({
    type: ActionTypes.ADD_TODO,
    id: nextTodoId++,
    text: name
});

export const toggleTodo = (id: number): ToggleTodoAction => ({
    type: ActionTypes.TOGGLE_TODO,
    id: id
});

const requestTodos = (filter: TodoFilter) => ({
    type: ActionTypes.REQUEST_TODOS,
    filter
});

const receiveTodos = (filter: TodoFilter, response: ITodo[]): ReceiveTodosAction => ({
    type: ActionTypes.RECEIVE_TODOS,
    filter,
    response
});

export const fetchTodos = (filter: TodoFilter) => (dispatch: Dispatch, getState: () => {ids: number[], isFetching: boolean}) => {
    if (getIsFetching(getState(), filter)) {
        return;
    }
    dispatch(requestTodos(filter));
    api.fetchTodos(filter).then(response =>
        dispatch(receiveTodos(filter, response)));
};