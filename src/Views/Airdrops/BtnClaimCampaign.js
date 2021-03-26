import { Button } from 'antd';

export default function BtnCancelCampaign({ campaign, claimsCampaign, loading, className }) {
  return (
    <>
      {campaign.status === '1' &&
      campaign.tokensYetClaim.length > 0 &&
      campaign.startTime < Math.floor(Date.now() / 1000) &&
      Math.floor(Date.now() / 1000) < campaign.endTime ? (
        <Button
          type='primary'
          shape='round'
          className={`${className}`}
          size='large'
          onClick={claimsCampaign}
          loading={loading}
        >
          Claim
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
