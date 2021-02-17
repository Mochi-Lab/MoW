import { Layout, Menu, Input } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ERC721 from 'Components/ERC721';
import { PacmanLoader } from 'react-spinners';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default function ERC721Filter({ erc721Tokens, isLoadingErc721 }) {
  const [selectedTokens, setSelectedTokens] = useState();

  return (
    <Layout>
      <Sider width={200} className='site-layout-background'>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key='sub1' icon={<ShopOutlined />} title='Collection'>
            <Menu.Item key='1'>
              <Input.Search allowClear style={{ width: '100%' }} placeholder='Search NFT' />
            </Menu.Item>
            {erc721Tokens ? (
              erc721Tokens.map((erc721Token, index) => (
                <Menu.Item key={index + 2} onClick={() => setSelectedTokens(erc721Token)}>
                  {erc721Token.name}
                </Menu.Item>
              ))
            ) : (
              <></>
            )}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className='site-layout-background'
          style={{
            padding: 6,
            margin: 0,
            minHeight: 280,
          }}
        >
          {/* because isLoadingERC721 will false before start loading so isLoadingErc72 = null may be best option */}
          {isLoadingErc721 || isLoadingErc721 === null ? (
            // Loading if done load the first type of token user have, if user select other load other
            <div className='center' style={{ width: '100%', minHeight: '200px' }}>
              <PacmanLoader color={'#36D7B7'} />
            </div>
          ) : selectedTokens ? (
            <ERC721 tokens={selectedTokens} />
          ) : (
            <ERC721 tokens={erc721Tokens[0]} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
