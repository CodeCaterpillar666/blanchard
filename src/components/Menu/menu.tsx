import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem"

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
        'menu-horizontal': mode !== 'vertical',
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
    const renderChildren = () => {
        // "React.Children provides utilities for dealing with the this.props.children opaque data structure."
        // https://reactjs.org/docs/react-api.html#reactchildren
        return React.Children.map(children, (child, index) => {
            /**
             * 1.childElement is an instance of its Component/type, and its Component/type is <MenuItem> whose type is React.FunctionComponent
             *   so we need to set childElement as React.FunctionComponentElement and pass in the props type of <MenuItem> to make it work
             * 2.By clicking this type with CONTROL, we could know that:
             *   a.interface FunctionComponentElement<P> extends ReactElement<P, FunctionComponent<P>>
             *   b.ReactElement has a property 'type'
            */
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
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
            const {displayName} = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // use React.cloneElement to auto-add index property into each child component
                return React.cloneElement(childElement, {index});
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem nor SubMenu');
            }
        });
    }
    return (
        <>
            <ul className={classes} style={style} data-testid="test-menu">
                <MenuContext.Provider value={passedContext}>
                    {renderChildren()}
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