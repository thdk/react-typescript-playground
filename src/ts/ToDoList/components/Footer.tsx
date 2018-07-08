import * as React from 'react';
import { TodoFilter } from "../interfaces";
import { FilterLink } from '../components/Link';

type FooterProps = {
    visibilityFilter: TodoFilter;
    onFilterClick: (filter: TodoFilter) => void;
}

export const Footer = () => {
    return (
        <p>
            Show:
                    <FilterLink
                filter="all"
            >
                All
                    </FilterLink>
            {' '}
            <FilterLink
                filter="active"
            >
                Active
                    </FilterLink>
            {' '}
            <FilterLink
                filter="completed"
            >
                Completed
                    </FilterLink>
        </p>
    );
}