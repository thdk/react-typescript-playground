import { TodosState } from "./reducers";

export interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

export type TodoFilter = "all" | "active" | "completed";