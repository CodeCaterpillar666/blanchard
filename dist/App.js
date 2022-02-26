import React, { useState } from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Button from './components/Button/button';
import Transition from './components/Transition/transition';
// Add imported icons globally
// https://fontawesome.com/v6/docs/web/use-with/react/add-icons#add-icons-globally
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
var App = function () {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Icon, { icon: "arrow-down", size: "10x", theme: "primary" }),
            React.createElement(Menu, { defaultIndex: '0', onSelect: function (index) { alert(index); }, defaultOpenSubMenus: ['2'] },
                React.createElement(MenuItem, null, "cool link 1"),
                React.createElement(MenuItem, { disabled: true }, "cool link 2"),
                React.createElement(SubMenu, { title: 'dropdown' },
                    React.createElement(MenuItem, null, "drop down 1"),
                    React.createElement(MenuItem, null, "drop down 2")),
                React.createElement(MenuItem, null, "cool link 3")),
            React.createElement(Button, { size: "lg", onClick: function () { setShow(!show); } }, "Toggle"),
            React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-left" },
                React.createElement("div", null,
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."))),
            React.createElement(Transition, { in: show, timeout: 300, animation: 'zoom-in-left', wrapper: true },
                React.createElement(Button, { btnType: 'primary', size: 'lg' }, "A Large Button")),
            React.createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React"))));
};
export default App;
