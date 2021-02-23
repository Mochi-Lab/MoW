import { Table, Layout, Menu, Input, Checkbox, Divider } from 'antd';
import { ShopOutlined, SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  'Transfer',
  'Approval',
  'SellOrderAdded',
  'SellOrderCompleted',
  'SellOrderDeactive',
];
const defaultCheckedList = [
  'Transfer',
  'Approval',
  'SellOrderAdded',
  'SellOrderCompleted',
  'SellOrderDeactive',
];

export default function TransactionTable() {
  const dispatch = useDispatch();
  const { web3, sellOrderList, erc721Instances, erc721Tokens, walletAddress } = useSelector(
    (state) => state
  );
  const [txns, setTxns] = useState([]);
  const [filterTxns, setFilterTxns] = useState([]);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const firstUpdate = useRef(true);
  const [tokenActive, setTokenActive] = useState(null);
  useEffect(() => {
    const fetchTxns = async () => {
      var getERC721Txn = (instance) => {
        return new Promise(async (resolve) => {
          let balance = await instance.methods.balanceOf(walletAddress).call();
          if (balance > 0) {
            let txn = [];
            // Transfer to
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

            // Transfer from
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

            // Owner
            await instance.events.Approval(
              {
                filter: { owner: walletAddress },
                fromBlock: 0,
              },
              function (error, event) {
                event.key = event.id;
                setTxns((txns) => [...txns, event]);
              }
            );

            // Approved
            await instance.events.Approval(
              {
                filter: { approved: walletAddress },
                fromBlock: 0,
              },
              function (error, event) {
                event.key = event.id;
                setTxns((txns) => [...txns, event]);
              }
            );

            await sellOrderList.events.SellOrderAdded(
              {
                filter: { seller: walletAddress },
                fromBlock: 0,
              },
              function (error, event) {
                event.key = event.id;
                setTxns((txns) => [...txns, event]);
              }
            );

            await sellOrderList.events.SellOrderDeactive(
              {
                filter: { seller: walletAddress },
                fromBlock: 0,
              },
              function (error, event) {
                event.key = event.id;
                setTxns((txns) => [...txns, event]);
              }
            );

            await sellOrderList.events.SellOrderCompleted(
              {
                filter: { seller: walletAddress },
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
    if (walletAddress && erc721Instances && sellOrderList) fetchTxns();
  }, [dispatch, walletAddress, erc721Instances, sellOrderList]);

  useEffect(() => {
    if (!firstUpdate.current) {
      let filterTxns = txns.filter((value) => checkedList.includes(value.event));
      setFilterTxns(filterTxns);
      setIsChecked(true);
    } else firstUpdate.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedList]);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

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
      dataIndex: 'returnValues',
      render: (value) => {
        if (value && value.price) return <p>{web3.utils.fromWei(value.price, 'ether')} BNB</p>;
        else <></>;
      },
      key: 'returnValues.price',
    },
    {
      title: 'From',
      dataIndex: 'returnValues',
      render: (value) => {
        let from = '';
        if (!!value.from) from = value.from.substr(0, 15) + '...';
        if (!!value.owner) from = value.owner.substr(0, 15) + '...';
        if (!!value.seller) from = value.seller.substr(0, 15) + '...';

        return <p style={{ margin: 0 }}>{from}</p>;
      },
      key: 'returnValues.from',
      width: 150,
    },
    {
      title: 'To',
      dataIndex: 'returnValues',
      render: (value) => {
        let to = '';
        if (!!value.to) to = value.to.substr(0, 15) + '...';
        if (!!value.owner) to = value.approved.substr(0, 15) + '...';
        if (!!value.buyer) to = value.buyer.substr(0, 15) + '...';
        return <p style={{ margin: 0 }}>{to}</p>;
      },
      key: 'returnValues.to',
      width: 150,
    },
    {
      title: 'Block Number',
      dataIndex: 'blockNumber',
      key: 'blockNumber',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.blockNumber - b.blockNumber,
    },
    {
      title: 'View',
      dataIndex: 'transactionHash',
      key: 'transactionHash',
      render: (value) => (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={`https://testnet.bscscan.com/tx/${value}`}
        >
          View
        </a>
      ),
    },
  ];

  function selectToken(token, index) {
    setTokenActive(index);
  }

  return (
    <Layout>
      <Sider width={200} className='site-layout-background style-sider-left'>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key='sub1'
            icon={<ShopOutlined />}
            title='Collection'
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
              />
            </Menu.Item>
            {erc721Tokens ? (
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
            )}
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
          <>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              Check all
            </Checkbox>

            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
            <Divider />
          </>
          <Table
            columns={columns}
            dataSource={isChecked ? filterTxns : txns}
            pagination={{ size: 'small' }}
            scroll={{ x: '100vw' }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
