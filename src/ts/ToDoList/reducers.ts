import { TodoFilter } from "./interfaces";

import {Actiontypes as VisibilityFilterActionTypes, Action as VisibilityFilterAction } from "./actions/visibilityfilter";

export const visibilityFilter = (state: TodoFilter = 'all', action: VisibilityFilterAction): TodoFilter => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case VisibilityFilterActionTypes.SET_VISIBILITY_FILTER:            
            return action.filter;
        default:
            return state;
    }
}