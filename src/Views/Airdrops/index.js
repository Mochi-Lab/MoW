import { useEffect, useState } from 'react';
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
import FormCreateCampaign from './FormCreateCampaign';
import StatusCampaign from './StatusCampaign';
import ModalDetailCampaign from './ModalDetailCampaign';
import moment from 'moment';

export default function Airdrops() {
  const { listCampaign, nftCampaign, walletAddress, loadingCampaign } = useSelector(
    (state) => state
  );
  const [showModalDetail, setShowModalDetail] = useState(false);

  const [campaignShowDetail, setCampaignShowDetail] = useState({});
  const [loadingCancel, setLoadingCancel] = useState({ status: false, index: -1 });
  const [loadingClaim, setLoadingClaim] = useState({ status: false, index: -1 });
  const [loadingAccept, setLoadingAccept] = useState({ status: false, index: -1 });

  useEffect(() => {
    async function fetchData() {
      await store.dispatch(fetchListCampaign());
    }
    fetchData();
  }, [nftCampaign, walletAddress]);

  useEffect(() => {
    setShowModalDetail(false);
  }, [walletAddress]);

  useEffect(() => {
    if (campaignShowDetail.index >= 0) {
      setCampaignShowDetail(listCampaign[campaignShowDetail.index]);
    }
  }, [listCampaign, campaignShowDetail]);

  function disabledDate(current) {
    return current && current < moment().subtract(1, 'days');
  }

  const setShowModalDetailCampaign = (status, campaign, index) => {
    setShowModalDetail(status);
    campaign.index = index;
    setCampaignShowDetail(campaign);
  };
  const cancelCampaign = async (campaignId) => {
    setLoadingCancel({ status: true, index: campaignId });
    let result = await store.dispatch(forceEndCampaign(campaignId));
    if (result) {
      await store.dispatch(fetchListCampaign());
      setShowModalDetail(false);
    }
    setLoadingCancel({ status: false, index: -1 });
  };
  const claimsCampaign = async (campaignId, tokenIds, type) => {
    setLoadingClaim({ status: true, index: campaignId });
    let result = await store.dispatch(claimTokenByNFT(campaignId, tokenIds));
    if (result) {
      await store.dispatch(fetchListCampaign());
      setShowModalDetail(false);
    }
    setLoadingClaim({ status: false, index: -1 });
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
    setLoadingAccept({ status: true, index: campaignId });
    let result = await store.dispatch(acceptCampaign(campaignId));
    if (result) {
      await store.dispatch(fetchListCampaign());
      setShowModalDetail(false);
    }
    setLoadingAccept({ status: false, index: -1 });
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
        <FormCreateCampaign disabledDate={disabledDate} />
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
                  onClick={() => setShowModalDetailCampaign(true, campaign, i)}
                  alt='banner-campaign'
                />
                <div className='description-short'>
                  <div
                    className='description-short-left'
                    onClick={() => setShowModalDetailCampaign(true, campaign, i)}
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
                    setShowModalDetailCampaign={() => setShowModalDetailCampaign(true, campaign, i)}
                  />
                </div>
              </div>
            ) : (
              <div className='airdrop-card' key={'cared_' + i}>
                <div className='description-short-list-airdrop'>
                  <div
                    className='description-short-left'
                    onClick={() => setShowModalDetailCampaign(true, campaign, i)}
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
                    setShowModalDetailCampaign={() => setShowModalDetailCampaign(true, campaign, i)}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <ModalDetailCampaign
        campaignShowDetail={campaignShowDetail}
        loadingCancel={loadingCancel}
        loadingClaim={loadingClaim}
        loadingAccept={loadingAccept}
        showModalDetail={showModalDetail}
        cancelCampaign={cancelCampaign}
        claimsCampaign={claimsCampaign}
        adminAcceptCampaign={adminAcceptCampaign}
        listCampaign={listCampaign}
        setCampaignShowDetail={setCampaignShowDetail}
        setShowModalDetail={setShowModalDetail}
        counterDays={counterDays}
        disabledDate={disabledDate}
      />
    </div>
  );
}
