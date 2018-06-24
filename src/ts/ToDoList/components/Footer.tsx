import * as React from 'react';
import { FilterLink } from "../todolistapp";
import { TodoFilter } from "../interfaces";

type FooterProps = {
    visibilityFilter: TodoFilter;
    onFilterClick: (filter: TodoFilter) => void;
}

export const Footer = () => {
    return (
        <p>
            Show:
                    <FilterLink
                filter="SHOW_ALL"
            >
                All
                    </FilterLink>
            {' '}
            <FilterLink
                filter="SHOW_ACTIVE"
            >
                Active
                    </FilterLink>
            {' '}
            <FilterLink
                filter="SHOW_COMPLETED"
            >
                Completed
                    </FilterLink>
        </p>
    );
}