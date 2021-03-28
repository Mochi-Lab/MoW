import { Button, Badge } from 'antd';
import { connectWeb3Modal } from 'Connections/web3Modal';
import { useSelector } from 'react-redux';

export default function ConnectWallet() {
  const { walletAddress, shortAddress } = useSelector((state) => state);

  const connect = () => {
    connectWeb3Modal();
  };

  return (
    <>
      <Button shape='round' onClick={() => connect()}>
        {!!walletAddress ? (
          <>
            <Badge status='success' />
            {shortAddress}
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
