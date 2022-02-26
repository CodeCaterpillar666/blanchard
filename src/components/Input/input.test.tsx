import { render, fireEvent, screen } from '@testing-library/react'
// component to test
import { Input, InputProps } from './input'

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input'
}
describe('test Input component', () => {
  it('should render the correct default Input', () => {
    render(<Input {...defaultProps}/>)
    const testNode = screen.getByPlaceholderText('test-input') as HTMLInputElement
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('input-inner')
    fireEvent.change(testNode, { target: { value: '23' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('23')
  })
  it('should render the disabled Input on disabled property', () => {
    render(<Input disabled placeholder="disabled"/>)
    const testNode = screen.getByPlaceholderText('disabled') as HTMLInputElement
    expect(testNode.disabled).toBeTruthy()
  })
  it('should render different input sizes on size property', () => {
    render(<Input placeholder="sizes" size="lg" name='test-input' />)
    // Use react/testing library's getBy.. methods instead of querySelector
    // const testContainer = view.container.querySelector('.input-wrapper')
    const testContainer = screen.getByTestId("test")
    expect(testContainer).toHaveClass('input-size-lg')
  })
  it('should render prepand and append element on prepand/append property', () => {
    render(<Input placeholder="pend" prepend="https://" append=".com"/>)
    // eslint-disable-next-line testing-library/no-container
    // const testContainer = container.querySelector('.input-wrapper')
    // eslint error, use the statement below instead
    const testContainer = screen.getByTestId("test")
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')

    // expect(queryByText('https://')).toBeInTheDocument()
    // eslint error, use the statement below instead
    expect(screen.getByText('https://')).toBeInTheDocument()

    // eslint error, use the statement below instead
    // expect(queryByText('.com')).toBeInTheDocument()
    expect(screen.getByText('.com')).toBeInTheDocument()
  })
})