import * as React from 'react';
import * as RectDom from 'react-dom'
import { TodoFilter } from '../interfaces';

type FilterLinkProps = {
    filter: TodoFilter;
    currentFilter: TodoFilter;
    onChange: (filter: TodoFilter) => void;
}

export class FilterLink extends React.Component<FilterLinkProps>  {    
    render() {
        const {filter, currentFilter, onChange } = this.props;

        if (filter === currentFilter) {
            return <span>{this.props.children}</span>;
        }

        return (
            <a href='#'
                onClick={e => onChange(filter)}
            >
                {this.props.children}
            </a>
        );
    }
}