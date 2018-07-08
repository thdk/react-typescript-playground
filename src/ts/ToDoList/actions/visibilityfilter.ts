import { TodoFilter } from "../interfaces";

export enum Actiontypes {
    SET_VISIBILITY_FILTER = 10
}

export interface SetVisibilityFilterAction {
    type: Actiontypes.SET_VISIBILITY_FILTER,
    filter: TodoFilter
}

export type Action = SetVisibilityFilterAction;

export const setVisibilityfilter = (filter: TodoFilter): SetVisibilityFilterAction => {
    return {
        type: Actiontypes.SET_VISIBILITY_FILTER,
        filter
    }
}