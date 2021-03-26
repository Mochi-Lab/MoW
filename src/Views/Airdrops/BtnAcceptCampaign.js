import { Button } from 'antd';
import { useSelector } from 'react-redux';

export default function BtnAcceptCampaign({ campaign, adminAcceptCampaign, loading, className }) {
  const { walletAddress } = useSelector((state) => state);
  return (
    <>
      {campaign.status === '0' &&
      campaign.startTime >= Math.floor(Date.now() / 1000) &&
      campaign.ownerContractCampaign.toLowerCase() === walletAddress.toLowerCase() ? (
        <Button
          type='primary'
          shape='round'
          className={`${className}`}
          size='large'
          onClick={adminAcceptCampaign}
          loading={loading}
        >
          Accept
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
