import * as React from 'react';
import * as RectDom from 'react-dom';
import {NavLink} from 'react-router-dom';
import { TodoFilter } from '../interfaces';

export type FilterLinkProps = {
    filter: TodoFilter;
    children?: any;
}

export const FilterLink = ({ filter, children }: FilterLinkProps) => (
    <NavLink to={filter === "all" ? "/all" : "/" + filter}
    activeStyle={ {
        textDecoration: 'none',
        color: 'red'
      }} >
    {children}
    </NavLink>

);
