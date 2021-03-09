import { Card, Row, Col, Skeleton } from 'antd';
import './index.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import imgNotFound from 'Assets/notfound.png';

const { Meta } = Card;

function ERC721Card({ token, strSearch }) {
  const { web3 } = useSelector((state) => state);
  const [detailNFT, setDetailNFT] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      if (!!token && !!token.tokenURI) {
        let req = await axios.get(token.tokenURI);
        setDetailNFT(req.data);
      } else {
        setDetailNFT({ name: '', description: '', image: imgNotFound });
      }
    }
    fetchDetail();
  }, [token]);

  return !!detailNFT &&
    (detailNFT.name.toLocaleLowerCase().includes(strSearch.toLowerCase()) ||
      token.collections.toLocaleLowerCase().includes(strSearch.toLowerCase())) ? (
    <Col className='gutter-row' xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
      {!!detailNFT ? (
        <Link to={`/token/${token.addressToken}/${token.index}`}>
          <Card
            hoverable
            style={{ width: '100%', margin: 'auto', padding: '12px' }}
            cover={<img className='erc721-img' alt={token.index} src={detailNFT.image} />}
            className='card-token'
          >
            <Meta
              title={
                <div className='sp-between'>
                  <strong>{detailNFT.name}</strong>
                  <strong>
                    {!!token.price ? `${web3.utils.fromWei(token.price, 'ether')} BNB` : <></>}
                  </strong>
                </div>
              }
              description={token.collections}
            />
          </Card>
        </Link>
      ) : (
        <Skeleton active round title='123' />
      )}
    </Col>
  ) : null;
}

export default function ERC721({ tokens }) {
  const [afterFilter, setafterFilter] = useState(!!tokens ? tokens : []);
  const { strSearch } = useSelector((state) => state);

  useEffect(() => {
    if (tokens) setafterFilter(() => tokens);
  }, [tokens]);

  return (
    <div>
      <Row gutter={[16, 24]} style={{ margin: 0 }}>
        {!!afterFilter ? (
          afterFilter.map((token, index) => (
            <ERC721Card key={index} token={token} strSearch={strSearch} />
          ))
        ) : (
          <></>
        )}
      </Row>
    </div>
  );
}
