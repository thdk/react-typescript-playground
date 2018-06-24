import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAppState } from '../interfaces';
import { Store } from 'redux';

let nextTodoId = 0;
export const AddTodo: React.SFC = ({ }, { store }: { store: Store }) => {
    let input: HTMLInputElement | undefined;
    return (
        <div>
            <input ref={node => {
                input = node ? node : undefined;
            }} />
            <button onClick={() => {
                store.dispatch({
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
}
AddTodo.contextTypes = {
    store: PropTypes.object
}
