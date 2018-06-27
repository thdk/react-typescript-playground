import { TodoFilter, IAppState } from "../interfaces";
import * as React from "react";
import { Link, LinkProps } from "../components/Link";
import { Dispatch, connect } from "react-redux";
import { setVisibilityfilter } from "../actions/visibilityfilter";

type FilterLinkProps = {
    filter: TodoFilter;
}

type StateToPropstype = Pick<LinkProps, "active">;
const mapStateToProps = (state: IAppState, ownProps: FilterLinkProps): StateToPropstype => {
    return {
        active: ownProps.filter === state.visibilityFilter
    };
}

type DispatchToPropsType = Pick<LinkProps, "onClick">;
const mapDispatchToProps = (dispatch: Dispatch, ownProps: FilterLinkProps):  DispatchToPropsType=> {
    return {
        onClick: () => {
            dispatch(setVisibilityfilter(ownProps.filter));
        }
    }
}

export const FilterLink = connect<StateToPropstype, DispatchToPropsType, FilterLinkProps, IAppState>(mapStateToProps, mapDispatchToProps)(Link);