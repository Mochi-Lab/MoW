import { Button } from 'antd';

export default function BtnClaimCampaign({ campaign, cancelCampaign, loading, className }) {
  return (
    <>
      {campaign.canCancel ? (
        <Button
          type='primary'
          shape='round'
          className={`${className}`}
          size='large'
          danger
          onClick={cancelCampaign}
          loading={loading}
        >
          Cancel
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
