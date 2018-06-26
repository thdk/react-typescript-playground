import { TodoFilter, ITodo } from "./interfaces";

export const todo = (state: ITodo | undefined, action: any) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case "TOGGLE_TODO":
            console.log(state);
            console.log(action);
            if (!state)
                throw "Cannot toggle the Todo as it's undefined.";

            if (state.id !== action.id) {
                console.log(`${action.id} ${state.id}`);
                return state;
            }

            const newState = {
                ...state,
                completed: !state.completed
            };
            console.log("new state");
            console.log(newState);
            return newState;
        default:
            throw `${action.type} is not implemented`;
    }
}

export const todos = (state: ITodo[] = [], action: any): ITodo[] => {
    console.log(action);
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case "TOGGLE_TODO":
            return state.map(t => todo(t, action));
        default:
            return state;
    }
}

export const visibilityFilter = (state: TodoFilter = 'SHOW_ALL', action: any): TodoFilter => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}