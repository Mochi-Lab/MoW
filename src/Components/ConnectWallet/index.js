import { Button, Badge } from 'antd';
import { connectWeb3Modal } from 'Connections/web3Modal';
import { useSelector } from 'react-redux';

export default function ConnectWallet() {
  const web3 = useSelector((state) => state.web3);

  const connect = () => {
    connectWeb3Modal();
  };

  return (
    <>
      <Button style={{ width: '143px' }} shape='round' onClick={() => connect()}>
        {!!web3 ? (
          <>
            <Badge status='success' />
            Change Wallet
          </>
        ) : (
          <>
            <Badge status='error' />
            Connect Wallet
          </>
        )}
      </Button>
    </>
  );
}
