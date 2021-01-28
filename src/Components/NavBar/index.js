import { useState } from 'react';

import { Drawer, Button, Grid } from 'antd';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { Link } from 'react-router-dom';

const { useBreakpoint } = Grid;

export default function NavBar() {
  const { md } = useBreakpoint();
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
        <Link to='/'>logo</Link>
      </div>
      <div className='menuCon'>
        <div className='leftMenu'>
          <LeftMenu />
        </div>
        <div className='rightMenu'>
          <RightMenu />
        </div>
        {md ? (
          <></>
        ) : (
          <Button className='barsMenu center' style={{ display: 'flex' }} onClick={showDrawer}>
            <span className='barsBtn'></span>
          </Button>
        )}

        <Drawer
          title='Menu'
          bodyStyle={{ padding: 0 }}
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
