import { Menu, Grid } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConnectWallet from 'Components/ConnectWallet';
import { useSelector } from 'react-redux';
import avatarDefault from 'Assets/avatar-default.svg';
import ToggleDarkMode from 'Components/ToggleDarkMode';

const SubMenu = Menu.SubMenu;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const screen = useBreakpoint();
  const { shortAddress, threeboxProfile, walletAddress } = useSelector((state) => state);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Menu mode={screen.md && screen.lg ? 'horizontal' : 'inline'}>
      {/* <Menu.Item key='browse'>
        <Link to='/browse'>Browse</Link>
      </Menu.Item>
      <Menu.Item key='/submit-Nfts'>
        <Link to='/submit-Nfts'>Submit NFTs</Link>
      </Menu.Item> */}
      <Menu.Item key='/airdrops'>
        <Link to='/'>Airdrops</Link>
      </Menu.Item>
      {/* <Menu.Item key='/create'>
        <Link to='/create'>Create</Link>
      </Menu.Item> */}
      <Menu.Item key='connect-wallet'>
        <ConnectWallet />
      </Menu.Item>
      {shortAddress ? (
        <SubMenu
          key='sub1'
          title={
            <div>
              <img
                className='nav-avatar'
                src={
                  threeboxProfile && threeboxProfile.image
                    ? 'https://gateway.ipfs.io/ipfs/' + threeboxProfile.image[0].contentUrl['/']
                    : avatarDefault
                }
                alt='avatar'
              />
            </div>
          }
        >
          <Menu.Item
            key='setting:3'
            style={{ width: '240px', height: '80px', cursor: 'pointer' }}
            disabled
          >
            <strong>
              {threeboxProfile && threeboxProfile.name ? (
                <h3 style={{ margin: 0 }} className='nav-textmode'>
                  {threeboxProfile.name}
                </h3>
              ) : (
                <h3 className='nav-textmode'>Unnamed</h3>
              )}
            </strong>
            <div>
              <div className='address' onClick={() => copyToClipboard()}>
                <p>
                  {shortAddress}
                  <span className='icon-coppy'>
                    {isCopied ? (
                      <svg
                        viewBox='0 0 14 11'
                        fill='none'
                        width='16'
                        height='16'
                        xlmns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M1 5L5 9L13 1'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        viewBox='0 0 13 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        xlmns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M3.25 8.25H2C1.86193 8.25 1.75 8.13807 1.75 8V2C1.75 1.86193 1.86193 1.75 2 1.75H8C8.13807 1.75 8.25 1.86193 8.25 2V3.25H5C4.0335 3.25 3.25 4.0335 3.25 5V8.25ZM3.25 9.75H2C1.0335 9.75 0.25 8.9665 0.25 8V2C0.25 1.0335 1.0335 0.25 2 0.25H8C8.9665 0.25 9.75 1.0335 9.75 2V3.25H11C11.9665 3.25 12.75 4.0335 12.75 5V11C12.75 11.9665 11.9665 12.75 11 12.75H5C4.0335 12.75 3.25 11.9665 3.25 11V9.75ZM11.25 11C11.25 11.1381 11.1381 11.25 11 11.25H5C4.86193 11.25 4.75 11.1381 4.75 11V5C4.75 4.86193 4.86193 4.75 5 4.75H11C11.1381 4.75 11.25 4.86193 11.25 5V11Z'
                          fill='currentColor'
                        ></path>
                      </svg>
                    )}
                  </span>
                </p>
              </div>
            </div>
          </Menu.Item>
          {/* <Menu.Item key='setting:2'>
            <Link to='/profile'>
              <strong className='nav-textmode'>Profile</strong>
            </Link>
          </Menu.Item> */}
          <Menu.Item key='setting:1' disabled>
            <div style={{ cursor: 'pointer', color: 'black' }} className='justifyContent'>
              <strong className='nav-textmode'>Dark mode</strong>
              <div style={{ margin: 5 }}>
                <ToggleDarkMode />
              </div>
            </div>
          </Menu.Item>
        </SubMenu>
      ) : (
        <></>
      )}
    </Menu>
  );
};

export default RightMenu;
