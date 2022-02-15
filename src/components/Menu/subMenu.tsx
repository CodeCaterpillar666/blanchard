import React, { useState, useContext, FunctionComponentElement } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
    const context = useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    // allow SubMenu auto-display when Menu in vertical mode
    const isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    const [menuOpen, setOpen] = useState(isOpen);
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    });

    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 0)
    }
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen)
    }

    // Based on Menu Component's mode (from context), SubMenu decides its display logic
    // 1.'vertical' mode, SubMenu displays when it is clicked
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    // 2.'horizontal' mode, SubMenu displays when mouse hovers on it
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}

    // Ensure that only Component instance with displayName 'MenuItem' be returned
    const renderChildren = () => {
        const subMenuClasses = classNames('submenu', {
            'menu-opened': menuOpen,
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    // idnex, parent index
                    // i, childElement index inside parent
                    index: `${index}-${i}`
                })
            } else {
                console.error('Warning: SubMenu has a child which is not a MenuItem component')
            }
        })
        return (
            <CSSTransition
                in={menuOpen}
                timeout={300}
                classNames="zoom-in-top"
                appear
                unmountOnExit
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </CSSTransition>
        );
    }
    return (
        <>
            {/* put hoverEvents on outer layer <li> so that when mouse hovers on out layer it will still be handled */}
            <li key={index} className={classes} {...hoverEvents}>
                <div className='submenu-title' {...clickEvents}>
                    {title}
                    <Icon icon="angle-down" className="arrow-icon" />
                </div>
                {renderChildren()}
            </li>
        </>
    );
}

SubMenu.displayName = "SubMenu";

export default SubMenu;