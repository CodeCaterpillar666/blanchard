var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useContext } from "react";
import classNames from "classnames";
import Transition from "../Transition/transition";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    // allow SubMenu auto-display when Menu in vertical mode
    var isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _b = useState(isOpen), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    });
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        // set timeout to prevent submenu twinkle
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 200);
    };
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    // Based on Menu Component's mode (from context), SubMenu decides its display logic
    // 1.'vertical' mode, SubMenu displays when it is clicked
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    // 2.'horizontal' mode, SubMenu displays when mouse hovers on it
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    // Ensure that only Component instance with displayName 'MenuItem' be returned
    var renderChildren = function () {
        var subMenuClasses = classNames('submenu', {
            'menu-opened': menuOpen,
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    // idnex, parent index
                    // i, childElement index inside parent
                    index: "".concat(index, "-").concat(i)
                });
            }
            else {
                console.error('Warning: SubMenu has a child which is not a MenuItem component');
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-left" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
            React.createElement("div", __assign({ className: 'submenu-title' }, clickEvents),
                title,
                React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
            renderChildren())));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
