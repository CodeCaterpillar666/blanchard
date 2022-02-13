import React, { useState, useContext, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
    index?: number;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
    const [menuOpen, setOpen] = useState(false);
    const context = useContext(MenuContext);
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
    });
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        setOpen(toggle)
        // clearTimeout(timer)
        // e.preventDefault()
        // timer = setTimeout(() => {
        //     setOpen(toggle)
        // }, 0)
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
                return childElement;
            } else {
                console.error('Warning: SubMenu has a child which is not a MenuItem component')
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        );
    }
    return (
        <>
            {/* put hoverEvents on outer layer <li> so that when mouse hovers on out layer it will still be handled */}
            <li key={index} className={classes} {...hoverEvents} {...clickEvents}>
                <div className='submenu-title' >
                    {title}
                </div>
                {renderChildren()}
            </li>
        </>
    );
}

SubMenu.displayName = "SubMenu";

export default SubMenu;