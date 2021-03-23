import { Tabs, Button, message } from 'antd';
import {
  ExpandAltOutlined,
  LeftOutlined,
  RightOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ERC721 from 'Contracts/ERC721.json';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import IconLoading from 'Components/IconLoading';
import Sell from 'Components/Sell';
import Buy from 'Components/Buy';
import Cancel from 'Components/Cancel';
import Transfer from 'Components/Transfer';
import ConnectWallet from 'Components/ConnectWallet';
import Share from 'Components/Share';
import './style.css';
import BackButton from 'Components/BackButton';

const { TabPane } = Tabs;

const RenderSwitch = ({ status, token, orderDetail }) => {
  switch (status) {
    case 3:
      return <Cancel orderDetail={orderDetail} />;
    case 2:
      return (
        <div className='PE'>
          <div className='actions-btn'>
            <Sell token={token} />
            <div className='cAFwWB' />
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
  const [expandImgDetail, setExpandImgDetail] = useState(false);
  // get details nft
  const { web3, walletAddress, sellOrderList, availableSellOrder721 } = useSelector(
    (state) => state
  );
  const { addressToken, id } = useParams();

  useEffect(() => {
    const getNFTDetails = async () => {
      try {
        const erc721Instances = await new web3.eth.Contract(ERC721.abi, addressToken);

        // check if user is owner of token
        let tokenOwner = await erc721Instances.methods.ownerOf(id).call();
        setOwner(tokenOwner);
        if (walletAddress && tokenOwner.toLowerCase() === walletAddress.toLowerCase()) {
          // Check if the token is in the order list?
          let isOnList = await sellOrderList.methods
            .checkDuplicate_ERC721(addressToken, id, tokenOwner)
            .call();
          isOnList ? setStatus(3) : setStatus(2);
        } else {
          let isOnList = await sellOrderList.methods
            .checkDuplicate_ERC721(addressToken, id, tokenOwner)
            .call();
          isOnList ? setStatus(1) : setStatus(0);
        }

        let fil = availableSellOrder721.filter(
          (token) => token.nftAddress === addressToken && token.tokenId === id
        );
        setOrderDetail(fil[0]);

        let indexInAvalableSell = availableSellOrder721.findIndex(
          (token) => token.nftAddress === addressToken && token.tokenId === id
        );
        setIndexAvailable(indexInAvalableSell);
        // get token info
        const token = await erc721Instances.methods.tokenURI(id).call();
        let detail;
        try {
          let req = await axios.get(token);
          detail = req.data;
        } catch (error) {
          detail = { name: 'Unnamed', description: '' };
        }
        setToken(detail);
      } catch (error) {
        console.log(error);
        message.error("NFT doesn't exist!");
      }
    };
    if (web3 && sellOrderList && availableSellOrder721) getNFTDetails();
  }, [web3, addressToken, id, walletAddress, sellOrderList, availableSellOrder721]);

  return (
    <>
      {!!token ? (
        expandImgDetail ? (
          <div className={`expand-img-nft PE ${expandImgDetail ? 'is-expand-img' : null}`}>
            <div className='btn-zoomin'>
              <div className='btns'>
                <Button
                  shape='circle'
                  icon={<FullscreenExitOutlined />}
                  size='large'
                  onClick={() => setExpandImgDetail(false)}
                />
              </div>
            </div>
            <div className='content-img'>
              <div className='eWiAaw'>
                <div className='img-content'>
                  <div className='css-1dbjc4n img-token width-100 hieght-100'>
                    <div className='token-img css-1dbjc4n box-img-expand'>
                      <div
                        className='img-bg css-1dbjc4n'
                        style={{ backgroundImage: `url(${token.image})` }}
                      ></div>
                      <img alt='img-nft' src={token.image} className='img-nft-expand' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='detail-nft'>
            <div className='content-nft'>
              <div className='nft-content content'>
                <div className='btns-actions'>
                  <div className='btns justifyContent'>
                    <BackButton />

                    <Button
                      shape='circle'
                      icon={<ExpandAltOutlined />}
                      size='large'
                      onClick={() => setExpandImgDetail(true)}
                    />
                  </div>
                </div>
                {indexAvailable - 1 < 0 ? (
                  <></>
                ) : (
                  <div className='btns btL'>
                    <Link
                      to={`/token/${availableSellOrder721[indexAvailable - 1].nftAddress}/${
                        availableSellOrder721[indexAvailable - 1].tokenId
                      }`}
                    >
                      <Button shape='circle' icon={<LeftOutlined />} size='large' />
                    </Link>
                  </div>
                )}

                <div className='content-nft-img PE'>
                  <div className='img-nft PE'>
                    <div className='img-token css-1dbjc4n'>
                      <div className='css-1dbjc4n img'>
                        <div className='img-bg css-1dbjc4n'></div>
                        <img alt='img-nft' src={token.image} />
                      </div>
                    </div>
                  </div>
                </div>
                {indexAvailable + 1 >= availableSellOrder721.length ? (
                  <></>
                ) : (
                  <div className='btns btR'>
                    <Link
                      to={`/token/${availableSellOrder721[indexAvailable + 1].nftAddress}/${
                        availableSellOrder721[indexAvailable + 1].tokenId
                      }`}
                    >
                      <Button shape='circle' icon={<RightOutlined />} size='large' />
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className='info-nft PE sideBar-bg'>
              <div className='sidebar-info'>
                <div className='nft-info'>
                  <div className='PE'>
                    <div className='box-title'>
                      <div>
                        <h1 title='Name' className='text-title textmode'>
                          {token.name}
                        </h1>
                      </div>
                      <Share token={token} />
                    </div>
                    {orderDetail ? (
                      <div className='price-nft'>
                        <div className='doaTrL'>
                          <div className='lapozE'>
                            <div className='price-eth'>
                              {web3.utils.fromWei(orderDetail.price, 'ether')} BNB
                            </div>
                            <div className='amount-nft'>1 of 1</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className='nft-info'>
                  <div className='description-nft textmode'>{token.description}</div>
                </div>
                <div className='nft-info'>
                  <div className='tabs-info'>
                    <Tabs defaultActiveKey='1'>
                      <TabPane tab='Owners' key='1'>
                        <p className='owner textmode'>
                          <strong>{owner}</strong>
                        </p>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
              <div className='footer-sidebar'>
                <div className='actions-buy-bid'>
                  <div className='PE'>
                    {walletAddress ? (
                      <RenderSwitch status={status} token={token} orderDetail={orderDetail} />
                    ) : (
                      <ConnectWallet />
                    )}

                    <div className='calc-fee'>
                      <div className='feeService textmode'>
                        Service fee
                        <span className='pt textmode'> 2.5% </span>.
                        <span className='eth-usd'> 0.308 BNB $470.95 </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className='center' style={{ width: '100%', minHeight: '200px' }}>
          <IconLoading />
        </div>
      )}
    </>
  );
}
