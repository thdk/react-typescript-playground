import { TodoFilter, IAppState } from "../interfaces";
import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "../components/Link";
import { Dispatch, connect } from "react-redux";

type FilterLinkProps = {
    filter: TodoFilter;
}

const mapStateToProps = (state: IAppState, ownProps: FilterLinkProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    };
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: FilterLinkProps) => {
    return {
        onClick: () => {
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            });
        }
    }
}

export const FilterLink = connect<{ active: boolean }, { onClick: () => void }, FilterLinkProps, IAppState>(mapStateToProps, mapDispatchToProps)(Link);