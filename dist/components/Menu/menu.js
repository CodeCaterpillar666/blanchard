import React, { useState, createContext } from "react";
import classNames from "classnames";
export var MenuContext = createContext({ index: '0' });
var Menu = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, children = props.children, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    // indicate which MenuItem is being focused
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        // "React.Children provides utilities for dealing with the this.props.children opaque data structure."
        // https://reactjs.org/docs/react-api.html#reactchildren
        return React.Children.map(children, function (child, index) {
            /**
             * 1.childElement is an instance of its Component/type, and its Component/type is <MenuItem> whose type is React.FunctionComponent
             *   so we need to set childElement as React.FunctionComponentElement and pass in the props type of <MenuItem> to make it work
             * 2.By clicking this type with CONTROL, we could know that:
             *   a.interface FunctionComponentElement<P> extends ReactElement<P, FunctionComponent<P>>
             *   b.ReactElement has a property 'type'
            */
            var childElement = child;
            // Since childElement is an instance of <MenuItem> type, and we have defined <MenuItem> type's displayNmae as 'MenuItem'
            // so that we could easily check one's displayName to ensure that it is a <MenuItem>, so we could get childELement's displayName
            // through its type property, which refers to React.FUnctionComponent<MenuItemProps>, and we could find an optional parameter
            // diaplayName in the definetion of React.FunctionComponent as follows:
            // interface FunctionComponent<P = {}> {
            //     (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
            //     propTypes?: WeakValidationMap<P> | undefined;
            //     contextTypes?: ValidationMap<any> | undefined;
            //     defaultProps?: Partial<P> | undefined;
            //     displayName?: string | undefined;
            // }
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // use React.cloneElement to auto-add index property into each child component
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem nor SubMenu');
            }
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
            React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren()))));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};
export default Menu;
