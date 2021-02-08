import { Table, Layout, Menu, Input } from 'antd';
import { StarOutlined, ShopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default function TransactionTable() {
  const dispatch = useDispatch();
  const { erc721Instances, erc721Tokens, walletAddress } = useSelector((state) => state);
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    const fetchTxns = async () => {
      var getERC721Txn = (instance) => {
        return new Promise(async (resolve) => {
          let balance = await instance.methods.balanceOf(walletAddress).call();
          if (balance > 0) {
            let txn = [];
            // to
            await instance.events.Transfer(
              {
                filter: { to: walletAddress },
                fromBlock: 0,
              },
              function (error, event) {
                event.key = event.id;
                setTxns((txns) => [...txns, event]);
              }
            );

            // from
            await instance.events.Transfer(
              {
                filter: { from: walletAddress },
                fromBlock: 0,
              },
              function (error, event) {
                event.key = event.id;
                setTxns((txns) => [...txns, event]);
              }
            );
            resolve(txn);
          } else {
            resolve();
          }
        });
      };

      if (!!erc721Instances)
        await Promise.all(
          erc721Instances.map(async (instance) => {
            return await getERC721Txn(instance);
          })
        );
    };
    fetchTxns();
  }, [dispatch, walletAddress, erc721Instances]);

  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Item.ID',
      dataIndex: 'returnValues',
      render: (value) => <p style={{ margin: 0 }}>{value.tokenId}</p>,
      key: 'returnValues.tokenId',
    },
    {
      title: 'Unit Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'From',
      dataIndex: 'returnValues',
      render: (value) => {
        if (value.from.length > 15) value.from = value.from.substr(0, 15) + '...';
        return <p style={{ margin: 0 }}>{value.from}</p>;
      },
      key: 'returnValues.from',
      width: 150,
    },
    {
      title: 'To',
      dataIndex: 'returnValues',
      render: (value) => {
        if (value.to.length > 15) value.to = value.to.substr(0, 15) + '...';
        return <p style={{ margin: 0 }}>{value.to}</p>;
      },
      key: 'returnValues.to',
      width: 150,
    },
    {
      title: 'Block Number',
      dataIndex: 'blockNumber',
      key: 'blockNumber',
    },
  ];

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
                <Menu.Item key={index + 2}>{erc721Token.name}</Menu.Item>
              ))
            ) : (
              <></>
            )}
          </SubMenu>
          <SubMenu key='sub2' icon={<StarOutlined />} title='Events'>
            <Menu.Item key='5'>Listings</Menu.Item>
            <Menu.Item key='6'>Sales</Menu.Item>
            <Menu.Item key='7'>Bids</Menu.Item>
            <Menu.Item key='8'>Transfers</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className='site-layout-background'
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {}, // click to open BscScan
              };
            }}
            columns={columns}
            dataSource={txns}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
