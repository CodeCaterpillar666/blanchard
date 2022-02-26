import React from 'react'
import { render, RenderResult, fireEvent, screen, cleanup, within } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      // Issue: Library incorrectly report no-node-access when referencing props.children #386
      // https://github.com/testing-library/eslint-plugin-testing-library/issues/386
      // eslint-disable-next-line testing-library/no-node-access
      return props.children
    }
  }
})
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
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
const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}
let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  const setup = () => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement= screen.getByTestId('test-menu')
    activeElement = screen.getByText('active')
    disabledElement = screen.getByText('disabled')
  }
  afterEach(cleanup);
  it('should render correct Menu and MenuItem based on default props', () => {
    setup();
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')

    // Use react testing library's methods instead of querySelectorAll
    // https://balavishnuvj.com/blog/testing-lists-items-with-react-testing-library/
    // expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem")
    expect(items.length).toBe(5)

    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    setup();
    const thirdItem = screen.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should show dropdown items when hover on subMenu', async () => {
    setup();
    expect(screen.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = screen.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    // TODO: bug
    // await wait(() => {
    //   expect(wrapper.queryByText('drop1')).toBeVisible()
    // })
    fireEvent.click(screen.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    // TODO: bug
    // await wait(() => {
    //   expect(wrapper.queryByText('drop1')).not.toBeVisible()
    // })
  })
})
describe('test Menu and MenuItem component in vertical mode', () => {
  const setup = () => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  }
  it('should render vertical mode when mode is set to vertical', () => {
    setup()
    const menuElement = screen.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    setup()
    const dropDownItem = screen.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible()
    fireEvent.click(screen.getByText('dropdown'))
    expect(dropDownItem).toBeVisible()
  })
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    setup()
    expect(screen.queryByText('opened1')).toBeVisible()
  })
})