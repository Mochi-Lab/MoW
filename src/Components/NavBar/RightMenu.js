import { Menu, Grid } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();

  return (
    <Menu mode={md ? 'horizontal' : 'inline'}>
      <Menu.Item key='create'>
        <Link to='/create'>Create</Link>
      </Menu.Item>
      <Menu.Item key='help'>
        <Link to='/help'>Help</Link>
      </Menu.Item>
      <Menu.Item key='contact'>
        <Link to='/contact'>Contact</Link>
      </Menu.Item>
      <SubMenu
        key='sub1'
        title={
          <div
            style={{ fontSize: '30px', height: '40px', display: 'flex' }}
            className='fas fa-user-circle'
          ></div>
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
