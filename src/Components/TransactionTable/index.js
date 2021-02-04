import { Table, Layout, Menu, Input } from 'antd';
import { StarOutlined, ShopOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default function TransactionTable() {
  const { erc721Tokens } = useSelector((state) => state);

  const data = [
    {
      key: '1',
      event: 'Transfer',
      item: 'Sustaniner',
      price: 32,
      quantity: 5,
      from: '0x85C4...',
      to: '0x85C4...',
      date: '6 month',
    },
    {
      key: '2',
      event: 'Created',
      item: 'Cosmos',
      price: 10,
      quantity: 1,
      from: '0x85C4...',
      to: '0x85C4...',
      date: '6 month',
    },
  ];

  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
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
      dataIndex: 'from',
      key: 'from',
      width: 150,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: 150,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
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
          <Table columns={columns} dataSource={data} />
        </Content>
      </Layout>
    </Layout>
  );
}
