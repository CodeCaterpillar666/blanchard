import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("li", { className: classes, style: style, onClick: handleClick }, children)));
};
// displayName
// https://reactjs.org/docs/react-component.html#displayname
// explicitly set displayName here to help us check component type in Menu's renderChildren method
MenuItem.displayName = 'MenuItem';
export default MenuItem;
