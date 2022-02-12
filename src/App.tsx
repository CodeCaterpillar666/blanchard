import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index)=>{alert(index)}} mode={'vertical'}>
          <MenuItem index={0}>
            cool link 1
          </MenuItem>
          <MenuItem disabled index={1}>
            cool link 2
          </MenuItem>
          <MenuItem index={2}>
            cool link 3
          </MenuItem>
        </Menu>
        <Button>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large</Button>
        <Button btnType={ButtonType.Link} href="www.google.com">Google Link</Button>
        <Button disabled btnType={ButtonType.Link} href="www.google.com">Google Link</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
