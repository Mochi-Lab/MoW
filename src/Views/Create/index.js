import { useState } from 'react';
import { Steps, Button, message, Input } from 'antd';
import './index.css';

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

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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
            <div className='select-box' onClick={() => next()}>
              <div>
                <p>
                  <strong>Live on BSC Mainnet</strong>
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
              />
            </div>

            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
            <Button type='primary' onClick={() => message.success('Processing complete!')}>
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
