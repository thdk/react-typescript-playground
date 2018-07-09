import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../interfaces';
import { Store, Dispatch } from 'redux';
import { addTodo } from '../actions/todos';

export interface TodoProps {
    dispatch: Dispatch
}

const _AddTodo: React.SFC<TodoProps> = ({ dispatch }) => {
    let input: HTMLInputElement | undefined;
    return (
        <div>
            <input ref={node => {
                input = node ? node : undefined;
            }} />
            <button onClick={() => dispatch(addTodo(input ? input.value : ""))}>
                Add todo
            </button>
        </div>
    );
};

export const AddTodo = connect()(_AddTodo);