export interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

export interface IAppState {
    todos: ITodo[];
    visibilityFilter: TodoFilter
}

export type TodoFilter = "SHOW_ALL" | "SHOW_ACTIVE" | "SHOW_COMPLETED";