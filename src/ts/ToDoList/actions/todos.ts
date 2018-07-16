import { ITodo, TodoFilter } from "../interfaces";

export enum ActionTypes {
    ADD_TODO,
    TOGGLE_TODO,
    RECEIVE_TODOS
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

export interface ReceiveTodosAction {
    type: ActionTypes.RECEIVE_TODOS;
    response: ITodo[];
}

export type Action = AddTodoAction | ToggleTodoAction;

let nextTodoId = 0;
export const addTodo = (name: string): AddTodoAction => ({
        type: ActionTypes.ADD_TODO,
        id: nextTodoId ++,
        text: name
});

export const toggleTodo = (id: number): ToggleTodoAction => ({
        type: ActionTypes.TOGGLE_TODO,
        id: id
});

export const receiveTodos = (filter: TodoFilter, response: ITodo[]): ReceiveTodosAction => ({
    type: ActionTypes.RECEIVE_TODOS,
    response
})