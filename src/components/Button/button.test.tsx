import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: "cls"
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

// https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-screen-queries.md
// Based on this rule, use screen to query.
// "This rule aims to force writing tests using built-in queries directly from screen object rather than destructuring them from render result."

describe('test Button component', () => {
    it('should render the correct default button', () => {
        // 1.test if element is in the dom
        render(<Button {...defaultProps}>Nice</Button>);
        const element = screen.getByText('Nice');
        // just-dom library添加测试方法，比toBeTruthy好理解多了，即判断element是否在dom内
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        // 2.test click event
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('should render the correct component based on different props', () => {
        // 1.test if element is in the dom
        render(<Button {...testProps}>Nice</Button>);
        const element = screen.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg cls');
    })
    it('should render a link when btnType equals to link and href is provided', () => {
        render(<Button btnType={'link'} href="http://testhref.abc">Link</Button>)
        const element = screen.getByText('Link') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
        expect(element.disabled).toBeFalsy();
    })
    it('should render disabled button when disabled set to true', () => {
        render(<Button {...disabledProps}>Disabled</Button>)
        const element = screen.getByText('Disabled') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })
})
 