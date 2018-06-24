import * as React from 'react';
import { FilterLink } from "./FilterLink";
import { TodoFilter } from "../interfaces";

type FooterProps = {
    visibilityFilter: TodoFilter;
    onFilterClick: (filter: TodoFilter) => void;
}

export const Footer = ({ visibilityFilter, onFilterClick }: FooterProps) => {
    return (
        <p>
            Show:
                    <FilterLink
                filter="SHOW_ALL"
                currentFilter={visibilityFilter}
                onChange={sFilter => onFilterClick(sFilter)}
            >
                All
                    </FilterLink>
            {' '}
            <FilterLink
                filter="SHOW_ACTIVE"
                currentFilter={visibilityFilter}
                onChange={sFilter => onFilterClick(sFilter)}
            >
                Active
                    </FilterLink>
            {' '}
            <FilterLink
                filter="SHOW_COMPLETED"
                currentFilter={visibilityFilter}
                onChange={sFilter => onFilterClick(sFilter)}
            >
                Completed
                    </FilterLink>
        </p>
    );
}