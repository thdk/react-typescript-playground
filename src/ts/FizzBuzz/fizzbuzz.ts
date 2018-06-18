import { getBoxStyle } from './Spiral'

import * as React from 'react';
import * as ReactDOM from 'react-dom';

const boxes = Array.from(new Array(15),(_, index: number)=>{
    const counter = index + 1;
    let content = '';
    if (counter % 3 === 0)
        content += 'Fizz';
    if (counter % 5 === 0)
        content += 'Buzz';

    return React.createElement('div', { style: getBoxStyle(index), key: index },
        (content ? React.createElement('strong', {}, content) : counter));
});

ReactDOM.render(
  React.createElement('div', {}, boxes),
  document.getElementById('app1')
)