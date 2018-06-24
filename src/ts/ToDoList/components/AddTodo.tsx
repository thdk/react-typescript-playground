import * as React from 'react';

type AddTodoProps = {
    onAddClick: (todo:string) => void;
}
export const AddTodo = ({onAddClick}: AddTodoProps) => {
    let input: HTMLInputElement | undefined;
    return (
        <div>
            <input ref={node => {
                input = node ? node : undefined;
            }} />
            <button onClick={() => {
                onAddClick(input ? input.value : '');
                if (input)
                    input.value = '';
            }}>
                Add todo
                </button>
        </div>
    );
}

