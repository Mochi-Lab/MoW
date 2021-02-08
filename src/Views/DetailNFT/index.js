import s from './style.module.css';
import { Tabs, Button } from 'antd';
import { ExpandAltOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ERC721 from 'Contracts/ERC721.json';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';

const { TabPane } = Tabs;

export default function DetailNFT() {
  const [token, setToken] = useState(null);
  // get details nft
  const { web3 } = useSelector((state) => state);
  const { addressToken, id } = useParams();

  useEffect(() => {
    const getNFTDetails = async () => {
      const erc721Instances = await new web3.eth.Contract(ERC721.abi, addressToken);
      const token = await erc721Instances.methods.tokenURI(id).call();
      let req = await axios.get(token);
      let detail = req.data;
      setToken(detail);
    };
    if (web3) getNFTDetails();
  }, [web3, addressToken, id]);

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
                  <div className={s['price-nft']}>
                    <div className={s.doaTrL}>
                      <div className={s.lapozE}>
                        <div className={s['price-eth']}>0.3 ETH</div>
                        <div className={s['price-usd']}>$459.46</div>
                        <div className={s['amount-nft']}>1 of 1</div>
                      </div>
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
                            <div className={s['price-nft']}>
                              <div className={s.doaTrL}>
                                <div className={s.lapozE}>
                                  <div className={s['price-eth']}>0.3 ETH</div>
                                  <div className={s['price-usd']}>$459.46</div>
                                  <div className={s['amount-nft']}>1 of 1</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={s['nft-info']}>
                          <div className={s['description-nft']}>{token.description}</div>
                        </div>
                        <div className={s['nft-info']}>
                          <div className={s['tabs-info']}>
                            <Tabs defaultActiveKey='1'>
                              <TabPane tab='Info' key='1'>
                                Content of Tab Pane 1
                              </TabPane>
                              <TabPane tab='Owners' key='2'>
                                Content of Tab Pane 2
                              </TabPane>
                              <TabPane tab='History' key='3'>
                                Content of Tab Pane 3
                              </TabPane>
                              <TabPane tab='Bids' key='4'>
                                Content of Tab Pane 4
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
                            <div className={s['actions-btn']}>
                              <div className={s.gSzfBw}>
                                <Button type='primary' shape='round' size='large'>
                                  Buy now
                                </Button>
                              </div>
                              <div className={s.cAFwWB}></div>
                              <div className={s.gSzfBw}>
                                <Button shape='round' size='large'>
                                  Bid
                                </Button>
                              </div>
                            </div>
                            <div className={s['calc-fee']}>
                              <div className={s.feeService}>
                                Service fee
                                <span className={s.pt}> 2.5% </span>.
                                <span className={s['eth-usd']}> 0.308 ETH $470.95 </span>
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
