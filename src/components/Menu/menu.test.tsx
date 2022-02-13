import React from "react";
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import { findRenderedComponentWithType } from "react-dom/test-utils";

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                xyz
            </MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>
                    opened1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}

// make a style.css specially for this test to test submenu
const createStyleFile = () => {
    const cssFile: string = `
        .submenu {
            display: none;
        }
        .submenu.menu-opened {
            display: block;
        }
    `
    const style = document.createElement('style')
    // style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        // insert test-specified style.css file
        wrapper.container.append(createStyleFile())
        // to get outmost layer <Menu>
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('menu test')
        // will get 5, since SubMenu and its MenuItem both have their own <li>
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3)

        // https://developer.mozilla.org/en-US/docs/Web/CSS/:scope
        // use :scope selector and > child combinator to query only all <li> at the first layer below menuElement
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    });
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('menu-item is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')  // index === 2
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    });
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()  // remove the menuElement with test-id 'test-menu'
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    });
    it('should show dropdown items when hover on subMenu', async () => {
        // in horizontal(default) mode Menu, SubMenu's dropdown will not be visible
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')

        // After firing an mouseEnter event on SubMenu, its dropdown should be visible
        fireEvent.mouseEnter(dropdownElement)
        // since the handleMouse function in subMenu.tsx is asynchronous and assertion is not,
        // we need to leverage async, await and testing library's waitFor to wait till the subMenu appears,
        // only then we will get what we expect
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })

        // After firing a click event on SubMenu's only MenuItem with text 'drop1', jest.fn() should have heared it
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

        // After firing an mouseLeave event on SubMenu, its dropdown should disappear
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })
});

// describe('test Menu, SubMenu and MenuItems when Menu is in vertical mode', () => {
//     beforeEach(() => {
//         wrapper2 = render(generateMenu(testVerProps))
//         wrapper.container.append(createStyleFile())  // append style.css into wrapper2
//     })
//     it('should render vertical mode when mode is set to vertical', () => {
//         const menuElement = wrapper2.getByTestId('test-menu')
//         expect(menuElement).toHaveClass('menu-vertical')
//     })
//     // in vertival mode, SubMenu will 
//     it('should show dropdown items when click on subMenu for vertical mode', () => {
//         const dropDownItem = wrapper2.queryByText('drop1')
//         expect(dropDownItem).not.toBeVisible()
//         fireEvent.click(wrapper2.getByText('dropdown'))
//         expect(dropDownItem).toBeVisible()
//       })
//       it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
//         expect(wrapper2.queryByText('opened1')).toBeVisible()
//       })
// })
describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = wrapper2.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible()
    fireEvent.click(wrapper2.getByText('dropdown'))
    expect(dropDownItem).toBeVisible()
  })
  // ????? it should be visible
//   it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
//     expect(wrapper2.queryByText('opened1')).not.toBeVisible()
//   })
})