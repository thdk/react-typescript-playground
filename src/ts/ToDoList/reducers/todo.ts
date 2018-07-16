import { ITodo } from "../interfaces";
import { ActionTypes as TodoActiontypes, Action as TodoAction, AddTodoAction, Action, ToggleTodoAction } from '../actions/todos';

const todo = (state: ITodo | undefined, action: TodoAction): ITodo => {
    switch (action.type) {
        case TodoActiontypes.ADD_TODO:
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case TodoActiontypes.TOGGLE_TODO:
            if (!state)
                throw "Cannot toggle the Todo as it's undefined.";

            if (state.id !== action.id) {
                console.log(`${action.id} ${state.id}`);
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
    }
}

export default todo;