import { Tag } from 'antd';
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import BtnClaimCampaign from './BtnClaimCampaign';
import BtnCancelCampaign from './BtnCancelCampaign';
import BtnAcceptCampaign from './BtnAcceptCampaign';

export default function StatusCampaign({
  campaign,
  counterDays,
  cancelCampaign,
  claimsCampaign,
  loadingCancel,
  loadingClaim,
  adminAcceptCampaign,
  loadingAccept,
  setShowModalDetailCampaign,
}) {
  return (
    <div className='description-short-right'>
      <div className='time-end-live' onClick={setShowModalDetailCampaign}>
        {campaign.status === '0' && campaign.startTime > Math.floor(Date.now() / 1000) ? (
          <div className='box-live-time'>
            <Tag icon={<ExclamationCircleOutlined />} color='warning' className='radius-1rem'>
              Waiting
            </Tag>
          </div>
        ) : null}
        {campaign.status === '0' && campaign.startTime < Math.floor(Date.now() / 1000) ? (
          <div className='box-live-time'>
            <Tag icon={<CloseCircleOutlined />} color='error' className='radius-1rem'>
              Invalid
            </Tag>
          </div>
        ) : null}
        {campaign.status === '1' && campaign.endTime < Math.floor(Date.now() / 1000) ? (
          <div className='box-live-time'>
            <Tag icon={<MinusCircleOutlined />} color='default' className='radius-1rem'>
              Expired
            </Tag>
          </div>
        ) : null}
        {campaign.status === '1' &&
        campaign.startTime < Math.floor(Date.now() / 1000) &&
        Math.floor(Date.now() / 1000) < campaign.endTime ? (
          <Tag color='success' className='radius-1rem'>
            <div className='box-live-time'>
              <div className='icon-live pulsatingDot'></div>
              <span className='time-counter--container'>
                Ends in<span>&nbsp;{counterDays(campaign.endTime)}</span>
              </span>
            </div>
          </Tag>
        ) : null}
        {campaign.status === '1' && campaign.startTime > Math.floor(Date.now() / 1000) ? (
          <div className='box-live-time'>
            <Tag icon={<SyncOutlined spin />} color='processing' className='radius-1rem'>
              Coming Soon
            </Tag>
          </div>
        ) : null}
      </div>
      <BtnCancelCampaign
        campaign={campaign}
        cancelCampaign={() => cancelCampaign(campaign.campaignId)}
        loading={loadingCancel.status && loadingCancel.index === campaign.campaignId}
        className='btn-cancel-campaign'
      />
      <BtnAcceptCampaign
        campaign={campaign}
        adminAcceptCampaign={() => adminAcceptCampaign(campaign.campaignId)}
        loading={loadingAccept.status && loadingAccept.index === campaign.campaignId}
        className='btn-cancel-campaign btn-color-accept'
      />
      <BtnClaimCampaign
        campaign={campaign}
        claimsCampaign={() => claimsCampaign(campaign.campaignId, campaign.tokensYetClaim)}
        loading={loadingClaim.status && loadingClaim.index === campaign.campaignId}
        className='btn-cancel-campaign'
      />
    </div>
  );
}
