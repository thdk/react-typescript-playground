import * as React from 'react';

// todo: get rid of the store dependency
import {Store} from 'redux';
declare const store: Store;

let nextTodoId = 0;
export const AddTodo = () => {
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

