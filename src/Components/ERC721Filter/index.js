import { Layout, Menu, Input } from 'antd';
import { ShopOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ERC721 from 'Components/ERC721Card';
import IconLoading from 'Components/IconLoading';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './index.css';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default function ERC721Filter({ erc721Tokens, isLoadingErc721 }) {
  const [selectedTokens, setSelectedTokens] = useState({});
  const [tokenActive, setTokenActive] = useState(null);
  const [filterCollections, setfilterCollections] = useState([]);

  const selectToken = (token, index) => {
    if (index === tokenActive) {
      setSelectedTokens(null);
      setTokenActive(null);
    } else {
      setSelectedTokens(token);
      setTokenActive(index);
    }
  };

  const searchCollections = (value) => {
    if (value.length > 0) {
      let filterCollections = erc721Tokens.filter((collection) =>
        collection.name.toLowerCase().includes(value.toLowerCase())
      );
      setfilterCollections(filterCollections);
    } else {
      setfilterCollections([]);
    }
  };

  return (
    <>
      <div className='carousel-collections'>
        <AliceCarousel
          responsive={{ 0: { items: 3 } }}
          animationType='fadeout'
          animationDuration={800}
          disableButtonsControls
          disableDotsControls
          infinite
          items={
            erc721Tokens
              ? erc721Tokens.map((erc721Token, index) => (
                  <div
                    className={`collection-nft sidenav-item ${
                      tokenActive === index ? 'is-active' : ''
                    }`}
                    onClick={() => selectToken(erc721Token, index)}
                  >
                    <div
                      className='avatar-token'
                      dangerouslySetInnerHTML={{ __html: erc721Token.avatarToken }}
                    />
                    <div className='name-token'>
                      <h2>{erc721Token.name}</h2>
                    </div>
                  </div>
                ))
              : []
          }
          mouseTracking
          innerWidth='50'
        />
      </div>
      <Layout style={{ height: '100%' }}>
        <Sider className='site-layout-background style-sider-left'>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu
              key='sub1'
              icon={<ShopOutlined />}
              title='Collections'
              className='collections-sidebar-left'
            >
              <Menu.Item key='1' onClick={() => selectToken(null, null)}>
                <Input
                  size='large'
                  className='input-search-collections'
                  allowClear
                  style={{ width: '100%' }}
                  placeholder='Search Collections'
                  prefix={<SearchOutlined />}
                  onChange={(e) => searchCollections(e.target.value)}
                />
              </Menu.Item>
              {filterCollections.length === 0 ? (
                erc721Tokens ? (
                  erc721Tokens.map((erc721Token, index) => (
                    <Menu.Item key={index + 2} onClick={() => selectToken(erc721Token, index)}>
                      <div className={`sidenav-item ${tokenActive === index ? 'is-active' : ''}`}>
                        <div
                          className='avatar-token'
                          dangerouslySetInnerHTML={{ __html: erc721Token.avatarToken }}
                        />
                        <div className='name-token'>
                          <h2>{erc721Token.name}</h2>
                        </div>
                      </div>
                    </Menu.Item>
                  ))
                ) : (
                  <></>
                )
              ) : (
                filterCollections.map((erc721Token, index) => (
                  <Menu.Item key={index + 2} onClick={() => selectToken(erc721Token, index)}>
                    <div className={`sidenav-item ${tokenActive === index ? 'is-active' : ''}`}>
                      <div
                        className='avatar-token'
                        dangerouslySetInnerHTML={{ __html: erc721Token.avatarToken }}
                      />
                      <div className='name-token'>
                        <h2>{erc721Token.name}</h2>
                      </div>
                    </div>
                  </Menu.Item>
                ))
              )}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '1rem' }} className='background-mode'>
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
              <div className='center' style={{ width: '100%', height: '100%' }}>
                <IconLoading />
              </div>
            ) : !!selectedTokens && !!selectedTokens.tokens ? (
              <ERC721 tokens={selectedTokens.tokens} />
            ) : (
              <ERC721
                tokens={
                  erc721Tokens
                    ? [].concat(
                        ...erc721Tokens.map((collections) =>
                          collections.tokens.map((token) => token)
                        )
                      )
                    : []
                }
              />
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
