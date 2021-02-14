import { useState } from 'react';
import { Steps, Button, Input } from 'antd';
import './index.css';
import { useDispatch } from 'react-redux';
import { registerNft } from 'store/actions';

const { Step } = Steps;

const steps = [
  {
    title: 'Select Network',
  },
  {
    title: 'Add Address',
  },
];

export default function Create() {
  const [current, setCurrent] = useState(0);
  const [contractAddress, setContractAddress] = useState('');
  const dispatch = useDispatch();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const register = () => {
    dispatch(registerNft(contractAddress));
  };

  return (
    <div className='create-page'>
      <Steps className='create-step center' current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className='steps-content '>
        {current === 0 ? (
          <div>
            <p className='get-listed'>Get Listed something awesome on ChoBuaNFT</p>
            <p className='select-network'>Select network</p>
            <div className='select-box'>
              <div>
                <p>
                  <strong>Live on BSC Mainnet</strong>
                  {/* coming soon image */}
                  <img
                    style={{ position: 'absolute', width: '60px' }}
                    src='http://www.pngall.com/wp-content/uploads/2016/05/Coming-Soon-PNG-Image.png'
                    alt='coming'
                  />
                </p>
                <p>Awesome things is ready to roll</p>
              </div>
            </div>
            <div className='select-box' onClick={() => next()}>
              <div>
                <p>
                  <strong>Live on BSC Testnet</strong>
                </p>
                <p>Awesome things but still in development process</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className='get-listed'>Enter your contract address</p>
            <p className='select-network'>What is the address of your ERC721 ?</p>
            <div>
              <Input
                className='input-address'
                size='large'
                placeholder='Enter your ERC721 contract address'
                onChange={(event) => setContractAddress(event.target.value)}
              />
            </div>

            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
            <Button type='primary' onClick={() => register()}>
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
