export enum ActionTypes {
    ADD_TODO,
    TOGGLE_TODO
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

export type Action = AddTodoAction | ToggleTodoAction;

let nextTodoId = 0;
export const addTodo = (name: string): AddTodoAction => {
    return {
        type: ActionTypes.ADD_TODO,
        id: nextTodoId ++,
        text: name
    }
}

export const toggleTodo = (id: number): ToggleTodoAction => {
    return {
        type: ActionTypes.TOGGLE_TODO,
        id: id
    }
}