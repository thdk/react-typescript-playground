import * as React from 'react'

export type TodoProps = {
    onClick: () => void;
    completed: boolean;
    text: string;
}

export const Todo = ({ onClick, completed, text }: TodoProps) => {
    const todoStyle = {
        textDecoration: completed ? "line-through" : "none"
    };

    return (
        <li onClick={onClick} style={todoStyle}>
            {text}
        </li>);
}