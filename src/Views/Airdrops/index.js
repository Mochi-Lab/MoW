import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import {
  fetchListCampaign,
  forceEndCampaign,
  claimTokenByNFT,
  acceptCampaign,
} from 'store/actions';
import store from 'store/index';
import './index.css';
import { useSelector } from 'react-redux';
import IconLoading from 'Components/IconLoading';
import { parseBalance, convertTimestampToDate } from 'utils/helper';
import FormCreateCampaign from './FormCreateCampaign';
import StatusCampaign from './StatusCampaign';
import BtnClaimCampaign from './BtnClaimCampaign';
import BtnCancelCampaign from './BtnCancelCampaign';
import BtnAcceptCampaign from './BtnAcceptCampaign';

export default function Airdrops() {
  const { listCampaign, nftClaimToken, walletAddress, loadingCampaign } = useSelector(
    (state) => state
  );
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [loadingCancelModal, setLoadingCancelModal] = useState(false);
  const [loadingClaimModal, setLoadingClaimModal] = useState(false);
  const [loadingAcceptModal, setLoadingAcceptModal] = useState(false);
  const [campaignShowDetail, setCampaignShowDetail] = useState({});
  const [loadingCancel, setLoadingCancel] = useState({ status: false, index: -1 });
  const [loadingClaim, setLoadingClaim] = useState({ status: false, index: -1 });
  const [loadingAccept, setLoadingAccept] = useState({ status: false, index: -1 });

  useEffect(() => {
    async function fetchData() {
      await store.dispatch(fetchListCampaign());
    }
    fetchData();
  }, [nftClaimToken, walletAddress]);

  useEffect(() => {
    setShowModalDetail(false);
  }, [walletAddress]);

  const setShowModalDetailCampaign = (status, campaign) => {
    setShowModalDetail(status);
    setCampaignShowDetail(campaign);
  };
  const cancelCampaign = async (campaignId, type) => {
    if (type === 'modal') {
      setLoadingCancelModal(true);
    } else {
      setLoadingCancel({ status: true, index: campaignId });
    }
    let result = await store.dispatch(forceEndCampaign(campaignId));
    if (result) {
      await store.dispatch(fetchListCampaign());
      setShowModalDetail(false);
    }
    if (type === 'modal') {
      setLoadingCancelModal(false);
    } else {
      setLoadingCancel({ status: false, index: -1 });
    }
  };
  const claimsCampaign = async (campaignId, tokenIds, type) => {
    if (type === 'modal') {
      setLoadingClaimModal(true);
    } else {
      setLoadingClaim({ status: true, index: campaignId });
    }
    let result = await store.dispatch(claimTokenByNFT(campaignId, tokenIds));
    if (result) {
      await store.dispatch(fetchListCampaign());
      setShowModalDetail(false);
    }
    if (type === 'modal') {
      setLoadingClaimModal(false);
    } else {
      setLoadingClaim({ status: false, index: -1 });
    }
  };

  const counterDays = (timeEnd) => {
    if (Math.floor(Date.now() / 1000) >= timeEnd) {
      return 0;
    }
    const oneDay = 24 * 60 * 60; // hours*minutes*seconds
    const oneHour = 60 * 60; // minutes*seconds
    const oneMinutes = 60; // 60 seconds
    const timeStart = Math.floor(Date.now() / 1000);

    if (timeEnd - timeStart < oneHour) {
      const diffMinutes = Math.round(Math.abs((timeEnd - timeStart) / oneMinutes));
      return `${diffMinutes < 10 ? '0' + diffMinutes : diffMinutes} ${
        diffMinutes === 1 ? 'minute' : 'minutes'
      }`;
    }

    if (timeEnd - timeStart < oneDay) {
      const diffHours = Math.round(Math.abs((timeEnd - timeStart) / oneHour));
      return `${diffHours < 10 ? '0' + diffHours : diffHours} ${
        diffHours === 1 ? 'hour' : 'hours'
      }`;
    }
    const diffDays = Math.round(Math.abs((timeEnd - timeStart) / oneDay));
    return `${diffDays < 10 ? '0' + diffDays : diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
  };

  const adminAcceptCampaign = async (campaignId, type) => {
    if (type === 'modal') {
      setLoadingAcceptModal(true);
    } else {
      setLoadingAccept({ status: true, index: campaignId });
    }
    let result = await store.dispatch(acceptCampaign(campaignId));
    if (result) {
      await store.dispatch(fetchListCampaign());
      setShowModalDetail(false);
    }
    if (type === 'modal') {
      setLoadingAcceptModal(false);
    } else {
      setLoadingAccept({ status: false, index: -1 });
    }
  };

  return (
    <div className='page-airdrops'>
      {loadingCampaign ? (
        <div className='center loading'>
          <IconLoading />
        </div>
      ) : (
        <></>
      )}
      <h1 className='title-airdrop textmode'>Airdrops</h1>
      <div className={`banner-airdrop ${listCampaign.length <= 0 ? 'margin-bottom-0' : ''}`}>
        <FormCreateCampaign />
      </div>
      <div className='list-airdrop background-airdrop-mode'>
        <div className='show-campaigns'>
          {listCampaign.map((campaign, i) =>
            i === 0 ? (
              <div
                className='banner-airdrop-nearest'
                style={{ animation: `1s ease 0s 1 normal none running fadein` }}
                key={'cared_' + i}
              >
                <img
                  src={!!campaign && !!campaign.urlBanner ? campaign.urlBanner : ''}
                  className='banner-campaign'
                  onClick={() => setShowModalDetailCampaign(true, campaign)}
                  alt='banner-campaign'
                />
                <div className='description-short'>
                  <div
                    className='description-short-left'
                    onClick={() => setShowModalDetailCampaign(true, campaign)}
                  >
                    <div className='icon-token'>
                      <img
                        src={!!campaign && !!campaign.urlIcon ? campaign.urlIcon : ''}
                        className='img-loaded'
                        alt='airdrop-img'
                      />
                      {campaign.status === '1' &&
                      campaign.startTime < Math.floor(Date.now() / 1000) &&
                      Math.floor(Date.now() / 1000) < campaign.endTime ? (
                        <span className='airdrop-badge red css-vurnku'>
                          <span>LIVE</span>
                        </span>
                      ) : null}
                    </div>
                    <div className='description-text'>
                      <div className='title-text-airdop'>{campaign.titleShort}</div>
                      <div className='description-text-airdop'>{campaign.slogan}</div>
                    </div>
                  </div>
                  <StatusCampaign
                    campaign={campaign}
                    counterDays={counterDays}
                    cancelCampaign={cancelCampaign}
                    claimsCampaign={claimsCampaign}
                    loadingCancel={loadingCancel}
                    loadingClaim={loadingClaim}
                    adminAcceptCampaign={adminAcceptCampaign}
                    loadingAccept={loadingAccept}
                    setShowModalDetailCampaign={() => setShowModalDetailCampaign(true, campaign)}
                  />
                </div>
              </div>
            ) : (
              <div className='airdrop-card' key={'cared_' + i}>
                <div className='description-short-list-airdrop'>
                  <div
                    className='description-short-left'
                    onClick={() => setShowModalDetailCampaign(true, campaign)}
                  >
                    <div className='icon-token'>
                      <img
                        src={!!campaign && !!campaign.urlIcon ? campaign.urlIcon : ''}
                        className='img-loaded'
                        alt='airdrop-img'
                      />
                      {campaign.status === '1' &&
                      campaign.startTime < Math.floor(Date.now() / 1000) &&
                      Math.floor(Date.now() / 1000) < campaign.endTime ? (
                        <span className='airdrop-badge red css-vurnku'>
                          <span>LIVE</span>
                        </span>
                      ) : null}
                    </div>
                    <div className='description-text'>
                      <div className='title-text-airdop'>{campaign.titleShort}</div>
                      <div className='description-text-airdop'>{campaign.slogan}</div>
                    </div>
                  </div>
                  <StatusCampaign
                    campaign={campaign}
                    counterDays={counterDays}
                    cancelCampaign={cancelCampaign}
                    claimsCampaign={claimsCampaign}
                    loadingCancel={loadingCancel}
                    loadingClaim={loadingClaim}
                    setLoadingCancel={setLoadingCancel}
                    adminAcceptCampaign={adminAcceptCampaign}
                    loadingAccept={loadingAccept}
                    setShowModalDetailCampaign={() => setShowModalDetailCampaign(true, campaign)}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Modal
        visible={showModalDetail}
        width={700}
        title={[
          <div className='title-airdrop-avatar textmode' key='title-airdrop-avatar'>
            <div className='icon-token title-airdrop-avatar-child'>
              <img src={campaignShowDetail.urlIcon} className='img-loaded' alt='airdrop-img' />
              {campaignShowDetail.status === '1' &&
              campaignShowDetail.startTime < Math.floor(Date.now() / 1000) &&
              Math.floor(Date.now() / 1000) < campaignShowDetail.endTime ? (
                <span className='airdrop-badge red css-vurnku airdrop-badge-modal'>
                  <span>LIVE</span>
                </span>
              ) : null}
            </div>
            <div className='title-airdrop-avatar-child'>
              <h2 className='textmode'>{campaignShowDetail.titleShort}</h2>
              <p className='slogan-airdrop'>{campaignShowDetail.slogan}</p>
            </div>
          </div>,
        ]}
        onOk={() => setShowModalDetail(false)}
        onCancel={() => setShowModalDetail(false)}
        footer={[
          <Button key='back' onClick={() => setShowModalDetail(false)} size='large' shape='round'>
            Exit
          </Button>,
          <BtnCancelCampaign
            key='cancel'
            campaign={campaignShowDetail}
            cancelCampaign={() => cancelCampaign(campaignShowDetail.campaignId, 'modal')}
            loading={loadingCancelModal}
          />,
          <BtnAcceptCampaign
            key='accept'
            campaign={campaignShowDetail}
            adminAcceptCampaign={() => adminAcceptCampaign(campaignShowDetail.campaignId, 'modal')}
            loading={loadingAcceptModal}
            className='btn-color-accept'
          />,
          <BtnClaimCampaign
            key='claim'
            campaign={campaignShowDetail}
            claimsCampaign={() =>
              claimsCampaign(
                campaignShowDetail.campaignId,
                campaignShowDetail.tokensYetClaim,
                'modal'
              )
            }
            loading={loadingClaimModal}
          />,
        ]}
      >
        <div className='amount-time-airdrop'>
          <div className='amount-airdrop amount-time-airdrop-box'>
            <div className='title-amount'>Amount</div>
            <div className='per-amount'>
              {parseBalance(campaignShowDetail.amountPerClaim)} {campaignShowDetail.symbolTokenEarn}{' '}
              per winner
            </div>
            <div className='num-uers-amount'>
              Remain {parseInt(campaignShowDetail.remainFunds / campaignShowDetail.amountPerClaim)}{' '}
              Winners can claim
            </div>
          </div>
          <div className='time-start-airdrop amount-time-airdrop-box'>
            <div className='title-time-start'>Airdrop starts</div>
            <div className='time-start'>{convertTimestampToDate(campaignShowDetail.startTime)}</div>
          </div>
          <div className='claim-ends amount-time-airdrop-box'>
            <div className='title-ends'>Claim ends</div>
            <div className='time-end'>
              {campaignShowDetail.startTime > Math.floor(Date.now() / 1000) ? (
                <span className='text-color-primary'>Campaign yet start</span>
              ) : counterDays(campaignShowDetail.endTime) <= 0 ? (
                <span className='text-color-red'>Campaign ended</span>
              ) : (
                `Ends in ${counterDays(campaignShowDetail.endTime)}`
              )}
            </div>
          </div>
        </div>
        <div className='description-airdrop'>
          <div className='header-description textmode'>{campaignShowDetail.titleDescription}</div>
          <div className='content-description textmode'>{campaignShowDetail.description}</div>
        </div>
      </Modal>
    </div>
  );
}
