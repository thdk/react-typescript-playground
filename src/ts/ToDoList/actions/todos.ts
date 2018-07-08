export enum ActionTypes {
    ADD_TODO,
    TOGGLE_TODO
}

export interface AddTodoAction {
    type: ActionTypes;
    id: number;
    text: string;
}

export interface ToggleTodoAction {
    type: ActionTypes;
    id: number;
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