import { Card, Row, Col, Input } from 'antd';
import './index.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Meta } = Card;

function ERC721Card({ token, name }) {
  const { web3 } = useSelector((state) => state);
  return (
    <Col className='gutter-row' span={8}>
      <Link to={`/token/${token.addressToken}/${token.index}`}>
        <Card
          hoverable
          style={{ width: '100%', margin: 'auto', padding: '12px' }}
          cover={<img className='erc721-img' alt={token.index} src={token.detail.image} />}
        >
          <Meta
            title={
              <div className='sp-between'>
                <strong>{token.detail.name}</strong>
                <strong>
                  {!!token.price ? `${web3.utils.fromWei(token.price, 'ether')} BNB` : <></>}
                </strong>
              </div>
            }
            description={name}
          />
        </Card>
      </Link>
    </Col>
  );
}

export default function ERC721({ tokens }) {
  const [afterFilter, setafterFilter] = useState(!!tokens ? tokens.tokens : null);

  useEffect(() => {
    if (!!tokens) {
      setafterFilter(tokens.tokens);
    }
  }, [tokens]);

  const searchNFT = (text) => {
    let filter = tokens.tokens.filter((token) => {
      let name = token.detail.name.toUpperCase();
      return name.includes(text.toUpperCase());
    });
    setafterFilter(filter);
  };

  return (
    <div>
      <Row gutter={[16, 24]} style={{ margin: 0 }}>
        <Col span={24}>
          <Input.Search
            allowClear
            onChange={(e) => searchNFT(e.target.value)}
            style={{ width: '100%' }}
            size='large'
            placeholder='Search NFT'
          />
        </Col>
        {!!tokens ? (
          afterFilter.map((token, index) => (
            <ERC721Card key={index} token={token} name={tokens.name} />
          ))
        ) : (
          <></>
        )}
      </Row>
    </div>
  );
}
