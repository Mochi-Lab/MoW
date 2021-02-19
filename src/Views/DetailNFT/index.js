import s from './style.module.css';
import { Tabs, Button, message } from 'antd';
import {
  ExpandAltOutlined,
  ShareAltOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ERC721 from 'Contracts/ERC721.json';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import Sell from 'Components/Sell';
import Buy from 'Components/Buy';
import Cancel from 'Components/Cancel';
import Transfer from 'Components/Transfer';

const { TabPane } = Tabs;

const RenderSwitch = ({ status, token, orderDetail }) => {
  switch (status) {
    case 3:
      return <Cancel orderDetail={orderDetail} />;
    case 2:
      return (
        <div className='PE'>
          <div className={s['actions-btn']}>
            <Sell token={token} />
            <div className={s.cAFwWB} />
            <Transfer token={token} />
          </div>
        </div>
      );
    case 1:
      return <Buy orderDetail={orderDetail} />;
    default:
      return <div></div>;
  }
};

export default function DetailNFT() {
  const [token, setToken] = useState(null);
  const [orderDetail, setOrderDetail] = useState();
  const [status, setStatus] = useState(0);
  const [owner, setOwner] = useState('');
  const [indexAvailable, setIndexAvailable] = useState(null);
  // get details nft
  const { web3, walletAddress, sellOrderList, availableSellOrder } = useSelector((state) => state);
  const { addressToken, id } = useParams();

  useEffect(() => {
    const getNFTDetails = async () => {
      try {
        const erc721Instances = await new web3.eth.Contract(ERC721.abi, addressToken);

        // check if user is owner of token
        let tokenOwner = await erc721Instances.methods.ownerOf(id).call();
        setOwner(tokenOwner);
        if (tokenOwner === walletAddress) {
          // Check if the token is in the order list?
          let isOnList = await sellOrderList.methods
            .checkDuplicate(addressToken, id, tokenOwner)
            .call();
          isOnList ? setStatus(3) : setStatus(2);
        } else {
          let isOnList = await sellOrderList.methods
            .checkDuplicate(addressToken, id, tokenOwner)
            .call();
          isOnList ? setStatus(1) : setStatus(0);
        }

        let fil = availableSellOrder.filter(
          (token) => token.nftAddress === addressToken && token.tokenId === id
        );
        setOrderDetail(fil[0]);

        let indexInAvalableSell = availableSellOrder.findIndex(
          (token) => token.nftAddress === addressToken && token.tokenId === id
        );
        setIndexAvailable(indexInAvalableSell);
        // get token info
        const token = await erc721Instances.methods.tokenURI(id).call();
        let req = await axios.get(token);
        let detail = req.data;
        setToken(detail);
      } catch (error) {
        console.log(error);
        message.error("NFT doesn't exist!");
      }
    };
    if (web3 && sellOrderList && walletAddress && availableSellOrder) getNFTDetails();
  }, [web3, addressToken, id, walletAddress, sellOrderList, availableSellOrder]);

  return (
    <>
      {!!token ? (
        <div className={`${s['detail-nft']} ${s.bWQTJz}`}>
          <div className={s['content-nft']}>
            <div className={`${s['nft-content']} content`}>
              <div className={s['btns-actions']}>
                <div className={s.btns}>
                  <Button shape='circle' icon={<ExpandAltOutlined />} size='large' />
                </div>
              </div>
              {indexAvailable - 1 < 0 ? (
                <></>
              ) : (
                <div className={`${s.btns} ${s.btL}`}>
                  <Link
                    to={`/token/${availableSellOrder[indexAvailable - 1].nftAddress}/${
                      availableSellOrder[indexAvailable - 1].tokenId
                    }`}
                  >
                    <Button shape='circle' icon={<LeftOutlined />} size='large' />
                  </Link>
                </div>
              )}

              <div className={`${s['content-nft-img']} PE`}>
                <div className={`${s['img-nft']} PE`}>
                  <div className={`${s['img-token']} ${s['css-1dbjc4n']}`}>
                    <div className={`${s['css-1dbjc4n']} ${s['img']}`}>
                      <div className={`${s['img-bg']} ${s['css-1dbjc4n']}`}></div>
                      <img alt='img-nft' src={token.image} />
                    </div>
                  </div>
                </div>
              </div>
              {indexAvailable + 1 >= availableSellOrder.length ? (
                <></>
              ) : (
                <div className={`${s.btns} ${s.btR}`}>
                  <Link
                    to={`/token/${availableSellOrder[indexAvailable + 1].nftAddress}/${
                      availableSellOrder[indexAvailable + 1].tokenId
                    }`}
                  >
                    <Button shape='circle' icon={<RightOutlined />} size='large' />
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className={`${s['info-nft']} PE`}>
            <div className={s['sidebar-info-nft']}>
              <div className={`${s['header-fixed-sidebar']} PE`}>
                <div className={s['header-fixed']}>
                  <div className={s['title-nft']}>
                    <div className={s['nft-title']}>
                      <h1 title='Name' className={`${s['text-title']} ${s['short-text']}`}>
                        {token.name}
                      </h1>
                    </div>
                    <div className={s['actions-nft']}>
                      <Button shape='circle' icon={<ShareAltOutlined />} size='large' />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${s['content-sidebar']}`}>
                <div className={s['sidebar-content']}>
                  <div className={`${s['box-sidebar']} PE`}>
                    <div className={`${s['sidebar-box']}`}>
                      <div className={s['sidebar-info']}>
                        <div className={s['nft-info']}>
                          <div className='PE'>
                            <div className={s['title-nft']}>
                              <div className={s['nft-title']}>
                                <h1 title='Name' className={s['text-title']}>
                                  {token.name}
                                </h1>
                              </div>
                              <div className={s['actions-nft']}>
                                <Button shape='circle' icon={<ShareAltOutlined />} size='large' />
                              </div>
                            </div>
                            {orderDetail ? (
                              <div className={s['price-nft']}>
                                <div className={s.doaTrL}>
                                  <div className={s.lapozE}>
                                    <div className={s['price-eth']}>
                                      {web3.utils.fromWei(orderDetail.price, 'ether')} BNB
                                    </div>
                                    {/* <div className={s['price-usd']}>$459.46</div> */}
                                    <div className={s['amount-nft']}>1 of 1</div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <div className={s['nft-info']}>
                          <div className={s['description-nft']}>{token.description}</div>
                        </div>
                        <div className={s['nft-info']}>
                          <div className={s['tabs-info']}>
                            <Tabs defaultActiveKey='1'>
                              <TabPane tab='Owners' key='1'>
                                <p>
                                  <strong>{owner}</strong>
                                </p>
                              </TabPane>
                            </Tabs>
                            {/* <div className={s['tabs']}>Tabs</div>
                        <div className={s['content-tabs']}>Contnet Tabs</div> */}
                          </div>
                        </div>
                      </div>
                      <div className={`${s['footer-sidebar']} `}>
                        <div className={s['actions-buy-bid']}>
                          <div className='PE'>
                            <RenderSwitch status={status} token={token} orderDetail={orderDetail} />

                            <div className={s['calc-fee']}>
                              <div className={s.feeService}>
                                Service fee
                                <span className={s.pt}> 2.5% </span>.
                                <span className={s['eth-usd']}> 0.308 BNB $470.95 </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='center' style={{ width: '100%', minHeight: '200px' }}>
          <PacmanLoader color={'#36D7B7'} />
        </div>
      )}
    </>
  );
}
