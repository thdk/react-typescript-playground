import { TodoFilter } from "../interfaces";
import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "../components/Link";

type FilterLinkProps = {
    filter: TodoFilter;
}

export class FilterLink extends React.Component<FilterLinkProps, {}> {
    private unsubscribe?: () => void;

    static contextTypes = {
        store: PropTypes.object
    }

    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmout() {
        if (this.unsubscribe)
            this.unsubscribe();
    }

    render() {
        const props = this.props;
        const {store} = this.context;
        const state = store.getState();

        return <Link active={props.filter === state.visibilityFilter}
            onClick={() => {
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter: props.filter
                });
            }} >{props.children}</Link>
    }
}

FilterLink.contextTypes = {
    store: PropTypes.object
}
