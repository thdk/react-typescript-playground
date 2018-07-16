import { TodosState } from "./reducers/todos";

export interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

export interface IAppState {
    todos: TodosState;
    visibilityFilter: TodoFilter
}

export type TodoFilter = "all" | "active" | "completed";