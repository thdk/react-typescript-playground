import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IAppState } from '../interfaces';
import { Store } from 'redux';

export interface TodoProps {
    dispatch: Dispatch
}

let nextTodoId = 0;
const _AddTodo: React.SFC<TodoProps> = ({ dispatch }) => {
    let input: HTMLInputElement | undefined;
    return (
        <div>
            <input ref={node => {
                input = node ? node : undefined;
            }} />
            <button onClick={() => {
                dispatch({
                    type: 'ADD_TODO',
                    text: input ? input.value : '',
                    id: nextTodoId++
                });
                if (input)
                    input.value = '';
            }}>
                Add todo
            </button>
        </div>
    );
};

export const AddTodo = connect()(_AddTodo);