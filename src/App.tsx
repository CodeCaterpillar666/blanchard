import React, { useState  } from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon';
import Button from './components/Button/button';
import Transition from './components/Transition/transition';

// Add imported icons globally
// https://fontawesome.com/v6/docs/web/use-with/react/add-icons#add-icons-globally
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const App: React.FC = () => {
  const [ show, setShow ] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="arrow-down" size="10x" theme="primary" />

        <Menu defaultIndex={'0'} onSelect={(index)=>{alert(index)}} defaultOpenSubMenus={['2']}>
          <MenuItem>
            cool link 1
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>
              drop down 1
            </MenuItem>
            <MenuItem>
              drop down 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>
        <Button size="lg" onClick={()=>{setShow(!show)}}>Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation={"zoom-in-left"}
        >
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation={'zoom-in-left'}
          wrapper
        >
          <Button btnType={'primary'} size={'lg'}>A Large Button</Button>
        </Transition>
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
