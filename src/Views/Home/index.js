import { useSelector } from 'react-redux';
// import ERC721Filter from 'Components/ERC721Filter';
import Slider from 'react-slick';
import { Row } from 'antd';
import IconLoading from 'Components/IconLoading';
import { carouselBanner, carouselCard } from './constantCarousel';
import CardNFTHome from './CardNFTHome.js';
import CardNFTNotSearch from './CardNFTNotSearch.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import iconNew from 'Assets/images/new.png';
import iconShop from 'Assets/images/shop.png';
import iconCreate from 'Assets/images/create.png';

export default function Home() {
  const { convertErc721Tokens, isLoadingErc721, strSearch } = useSelector((state) => state);
  const mergeAllCollections = () => {
    return [].concat(
      ...convertErc721Tokens.map((collections) => collections.tokens.map((token) => token))
    );
  };
  const randomCreate = () => {
    let listNFT = mergeAllCollections();
    if (listNFT.length < 7) {
      return listNFT;
    }
    var arr = [];
    var result = [];
    while (arr.length < 8) {
      var r = Math.floor(Math.random() * listNFT.length);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    for (let i = 0; i < arr.length; i++) {
      result.push(listNFT[arr[i]]);
    }
    return result;
  };

  const newListing = () => {
    let listNFT = mergeAllCollections();
    listNFT = listNFT.sort((a, b) => {
      if (a.sortIndex < b.sortIndex) return -1;
      if (a.sortIndex > b.sortIndex) return 1;
      return 0;
    });
    return listNFT.slice(0, 10);
  };
  return (
    <div className='content-home '>
      <Slider {...carouselBanner} className='carousel-banner-home'>
        <div className='item-carousel'>
          <img
            src='https://treasureland.market/static/media/alpaca_banner.67c52c5a.png'
            alt='banner'
          />
        </div>
        <div className='item-carousel'>
          <img
            src='https://treasureland.market/static/media/banner_image.15026b74.png'
            alt='banner'
          />
        </div>
        <div className='item-carousel'>
          <img
            src='https://treasureland.market/static/media/seascape_banner.d62787c4.png'
            alt='banner'
          />
        </div>
      </Slider>
      {isLoadingErc721 || isLoadingErc721 === null ? (
        // Loading if done load the first type of token user have, if user select other load other
        <div className='center' style={{ width: '100%', height: '100%' }}>
          <IconLoading />
        </div>
      ) : (
        <div className='container'>
          {/* <div className='top-sell-buy'>
            <div className='title-top-sell-buy'>
              <h2>Top artist </h2>
            </div>
            <Slider className='carousel-new-nfts' {...carouselTopSellBuy}>
              {dataTopSelBuy.map((user, i) => (
                <div className='item-top' key={i}>
                  <div className='user-top'>
                    <div className='num-order'>{i + 1}</div>
                    <div className='avatar-top'>
                      <img src={user.avatar} alt='avatar-top' />
                    </div>
                    <div className='info-top'>
                      <p className='name-user-top'>{user.name}</p>
                      <p className='amount-top'>{user.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div> */}
          <div className='new-nfts'>
            <div className='title-new'>
              <h2 className='textmode'>
                New List <img src={iconNew} className='icon-new' alt='icon-new-list' />
              </h2>
            </div>
            <Slider className='carousel-new-nfts' {...carouselCard}>
              {newListing().map((nft, i) => (
                <div className='item-carousel' key={i}>
                  <CardNFTNotSearch token={nft} />
                </div>
              ))}
            </Slider>
          </div>
          <div className='create-nft'>
            <div className='title-create'>
              <h2 className='textmode'>
                Latest Created <img src={iconCreate} className='icon-new' alt='icon-new-created' />
              </h2>
            </div>
            <Slider className='carousel-create-nfts' {...carouselCard}>
              {randomCreate().map((nft, i) => (
                <div className='item-carousel' key={i}>
                  <CardNFTNotSearch token={nft} />
                </div>
              ))}
            </Slider>
          </div>
          <div className='explore-nft'>
            <div className='title-explore'>
              <h2 className='textmode'>
                Explore <img src={iconShop} className='icon-new' alt='icon-explore' />
              </h2>
            </div>
            <Row>
              {mergeAllCollections().map((nft, i) => (
                <CardNFTHome token={nft} strSearch={strSearch} key={i} />
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}
