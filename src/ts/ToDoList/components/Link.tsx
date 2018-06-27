import * as React from 'react';
import * as RectDom from 'react-dom'
import { TodoFilter } from '../interfaces';

export type LinkProps = {
    active: boolean;
    children?: any;
    onClick: (e: any) => void;
}

export const Link = ({ active, children, onClick }: LinkProps) => {
    if (active) {
        return <span>{children}</span>;
    }

    return (
        <a href='#'
            onClick={e => {
                e.preventDefault();
                onClick(e)
            }
            }
        >
            {children}
        </a>
    );
}
