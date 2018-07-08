export interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

export interface IAppState {
    todos: ITodo[];
    visibilityFilter: TodoFilter
}

export type TodoFilter = "all" | "active" | "completed";