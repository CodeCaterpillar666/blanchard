import React, { useState, createContext } from "react";
import classNames from "classnames";

// typescript, string literal type
type MenuMode = 'horizontal' | 'vertical';
type selectCallback = (selectIndex: number) => void;

export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: selectCallback;
}

interface IMenuContext {
    index: number;
    onSelect?: selectCallback;
}

export const MenuContext = createContext<IMenuContext>({index: 0});

const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex, className, mode, style, children, onSelect } = props;
    // indicate which MenuItem is being focused
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
    });
    const handleClick = (index: number) => {
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }
    };
    const passedContext: IMenuContext = {
        index: currentActive? currentActive : 0,
        onSelect: handleClick,
    }
    return (
        <>
            <ul className={classes} style={style} data-testid="test-menu">
                <MenuContext.Provider value={passedContext}>
                    {children}
                </MenuContext.Provider>
            </ul>
        </>
    );
};

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal',
}

export default Menu;