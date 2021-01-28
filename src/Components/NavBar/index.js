import { useState } from 'react';

import { Drawer, Button } from 'antd';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';

import './index.css';

export default function NavBar() {
  // const [current, setCurrent] = useState('mail');
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className='menuBar alignItem'>
      <div className='logo'>
        <a>logo</a>
      </div>
      <div className='menuCon'>
        <div className='leftMenu'>
          <LeftMenu />
        </div>
        <div className='rightMenu'>
          <RightMenu />
        </div>
        <Button className='barsMenu' type='primary' onClick={showDrawer}>
          <span className='barsBtn'></span>
        </Button>
        <Drawer
          title='Basic Drawer'
          placement='right'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
}
