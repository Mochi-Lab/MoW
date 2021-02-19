import { Menu, Grid } from 'antd';
import { Link } from 'react-router-dom';
import ConnectWallet from 'Components/ConnectWallet';
import { useSelector } from 'react-redux';

const SubMenu = Menu.SubMenu;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  const shortAddress = useSelector((state) => state.shortAddress);
  return (
    <Menu mode={md ? 'horizontal' : 'inline'}>
      <Menu.Item key='explorer'>
        <Link to='/'>Explorer</Link>
      </Menu.Item>
      <SubMenu key='create-sub' title='Create'>
        <Menu.Item key='create'>
          <Link to='/create'>
            <strong>Submit NFTs</strong>
          </Link>
        </Menu.Item>
        <Menu.Item key='collection'>
          <Link to='/collection'>
            <strong>My Collection</strong>
          </Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key='contact'>
        <Link to='/contact'>Contact</Link>
      </Menu.Item>
      <ConnectWallet />
      <SubMenu
        key='sub1'
        title={
          <div
            style={{ fontSize: '30px', height: '40px', display: 'flex' }}
            className='fas fa-user-circle'
          ></div>
        }
      >
        {shortAddress ? (
          <Menu.Item key='setting:1'>
            <strong>{shortAddress}</strong>
          </Menu.Item>
        ) : (
          <></>
        )}

        <Menu.Item key='setting:2'>
          <Link to='/profile'>
            <strong>Profile</strong>
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default RightMenu;
