import React from 'react';
import { Menu, Grid } from 'antd';

const { useBreakpoint } = Grid;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const RightMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? 'horizontal' : 'inline'}>
      <Menu.Item key='create'>
        <a href=''>Create</a>
      </Menu.Item>
      <Menu.Item key='help'>
        <a href=''>Help</a>
      </Menu.Item>
      <Menu.Item key='contact'>
        <a href=''>Contact</a>
      </Menu.Item>
      <SubMenu
        key='avatar'
        title={
          <span
            style={{ fontSize: '30px', height: '40px', display: 'flex' }}
            className='fas fa-user-circle'
          ></span>
        }
      >
        <MenuItemGroup title='Item 1'>
          <Menu.Item key='setting:1'>Option 1</Menu.Item>
          <Menu.Item key='setting:2'>Option 2</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default RightMenu;
