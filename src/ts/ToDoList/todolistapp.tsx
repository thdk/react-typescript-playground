import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Root } from './configureStore';

// todo: move to test script command
//runAllTests();

ReactDom.render(
    <Root/>,
    document.getElementById("app2")
);