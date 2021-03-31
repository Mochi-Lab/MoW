import { useState, useEffect } from 'react';
import { Button, Col, Modal, Row, Card, Collapse, InputNumber, Form, DatePicker } from 'antd';
import { fetchListCampaign, addMoreSlots, rescheduleCampaign, extendCampaign } from 'store/actions';
import store from 'store/index';
import './index.css';
import { parseBalance, convertTimestampToDate } from 'utils/helper';
import BtnClaimCampaign from './BtnClaimCampaign';
import BtnCancelCampaign from './BtnCancelCampaign';
import BtnAcceptCampaign from './BtnAcceptCampaign';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Meta } = Card;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

export default function ModalDetailCampaign({
  campaignShowDetail,
  loadingCancel,
  loadingClaim,
  loadingAccept,
  showModalDetail,
  cancelCampaign,
  claimsCampaign,
  adminAcceptCampaign,
  setShowModalDetail,
  counterDays,
  disabledDate,
}) {
  const [addSlots, setAddSlots] = useState(1);
  const [loadingAddMore, setLoadingAddMore] = useState();
  const [loadingChangeTime, setLoadingChangeTime] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const formatDate = 'YYYY/MM/DD HH:mm';

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      times: [
        moment(new Date(campaignShowDetail.startTime * 1000)),
        moment(new Date(campaignShowDetail.endTime * 1000)),
      ],
    });
    if (campaignShowDetail.startTime || campaignShowDetail.endTime) {
      setStartTime(campaignShowDetail.startTime);
      setEndTime(campaignShowDetail.endTime);
    }
  }, [campaignShowDetail.startTime, campaignShowDetail.endTime, form]);

  const changeAddSlots = async (amount) => {
    if (Number.isInteger(amount)) {
      setAddSlots(amount);
    }
  };
  const increaseSlots = async () => {
    if (Number.isInteger(addSlots)) {
      setAddSlots(parseInt(addSlots) + 1);
    }
  };
  const decreaseSlots = async () => {
    if (Number.isInteger(addSlots) && addSlots > 1) {
      setAddSlots(parseInt(addSlots) - 1);
    }
  };

  const addSlotsForCampaign = async (campaignId) => {
    setLoadingAddMore(true);
    let result = await store.dispatch(addMoreSlots(campaignId, addSlots));
    if (result) {
      await store.dispatch(fetchListCampaign());
    }
    setLoadingAddMore(false);
  };

  const changeInputTimeAirdrop = async (time) => {
    const [startTime, endTime] = time;
    if (startTime && endTime) {
      setStartTime(startTime.unix());
      setEndTime(endTime.unix());
    }
  };
  const handleExtendCampaign = async (campaignId) => {
    let fieldErrors = null;
    try {
      await form.validateFields();
    } catch (errorInfo) {
      fieldErrors = errorInfo.errorFields;
    }
    if (!fieldErrors) {
      setLoadingChangeTime(true);
      await store.dispatch(extendCampaign(campaignId, endTime));
      await store.dispatch(fetchListCampaign());
      setLoadingChangeTime(false);
    }
  };
  const handleRescheduleCampaign = async (campaignId) => {
    let fieldErrors = null;
    try {
      await form.validateFields();
    } catch (errorInfo) {
      fieldErrors = errorInfo.errorFields;
    }
    if (!fieldErrors) {
      setLoadingChangeTime(true);
      await store.dispatch(rescheduleCampaign(campaignId, startTime, endTime));
      await store.dispatch(fetchListCampaign());
      setLoadingChangeTime(false);
    }
  };

  const validateTimeChange = async (_, value) => {
    if (!!value[0] && !!value[1]) {
      if (
        startTime === campaignShowDetail.startTime &&
        campaignShowDetail.startTime > Math.floor(Date.now() / 1000)
      ) {
        return Promise.reject("'Start Time' not change");
      }
      if (endTime === campaignShowDetail.endTime) {
        return Promise.reject("'End Time' not change");
      }
      if (endTime === startTime) {
        return Promise.reject("'Start Time' equal 'End Time' is invalid");
      }
    } else {
      return Promise.reject("'Times' is required");
    }
  };

  return (
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
          Close
        </Button>,
        <BtnCancelCampaign
          key='cancel'
          campaign={campaignShowDetail}
          cancelCampaign={() => cancelCampaign(campaignShowDetail.campaignId)}
          loading={loadingCancel.status && loadingCancel.index === campaignShowDetail.campaignId}
        />,
        <BtnAcceptCampaign
          key='accept'
          campaign={campaignShowDetail}
          adminAcceptCampaign={() => adminAcceptCampaign(campaignShowDetail.campaignId)}
          loading={loadingAccept.status && loadingAccept.index === campaignShowDetail.campaignId}
          className='btn-color-accept'
        />,
        <BtnClaimCampaign
          key='claim'
          campaign={campaignShowDetail}
          claimsCampaign={() =>
            claimsCampaign(campaignShowDetail.campaignId, campaignShowDetail.tokensYetClaim)
          }
          loading={loadingClaim.status && loadingClaim.index === campaignShowDetail.campaignId}
        />,
      ]}
    >
      <div className='amount-time-airdrop'>
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 10 }}>
            <div className='amount-airdrop amount-time-airdrop-box'>
              <div className='per-amount'>
                {parseBalance(campaignShowDetail.amountPerSlot)}{' '}
                {campaignShowDetail.symbolTokenEarn} per winner
              </div>
              <div className='num-uers-amount'>
                Remain {campaignShowDetail.remainSlots} Winners can claim
              </div>
              {campaignShowDetail.canCancel ? (
                <div className='add-slot-claim'>
                  <Collapse>
                    <Panel header='Add slots' key='1'>
                      <Form layout='vertical' name='control-hooks'>
                        <Form.Item
                          name='addSlots'
                          label='Slots'
                          rules={[{ required: true, message: "'Slots' is required" }]}
                        >
                          <Row align='middle'>
                            <Col span={6}>
                              <Button
                                icon={<MinusOutlined />}
                                shape='round'
                                size='small'
                                onClick={decreaseSlots}
                              />
                            </Col>
                            <Col span={12}>
                              <InputNumber
                                step={1}
                                parser={Number}
                                min={1}
                                value={addSlots}
                                onChange={changeAddSlots}
                              />
                            </Col>
                            <Col span={6}>
                              <Button
                                icon={<PlusOutlined />}
                                shape='round'
                                size='small'
                                onClick={increaseSlots}
                              />
                            </Col>
                          </Row>
                        </Form.Item>
                        <Button
                          type='primary'
                          shape='round'
                          onClick={() => addSlotsForCampaign(campaignShowDetail.campaignId)}
                          loading={loadingAddMore}
                        >
                          Add
                        </Button>
                      </Form>
                    </Panel>
                  </Collapse>
                </div>
              ) : null}
            </div>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 14 }}>
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <div className='time-start-airdrop amount-time-airdrop-box'>
                  <div className='title-time-start'>Airdrop starts</div>
                  <div className='time-start'>
                    {convertTimestampToDate(campaignShowDetail.startTime)}
                  </div>
                </div>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <div className='claim-ends amount-time-airdrop-box'>
                  <div className='title-ends'>Claim ends</div>
                  <div className='time-end'>
                    {campaignShowDetail.startTime > Math.floor(Date.now() / 1000) ? (
                      <span className='text-color-primary'>Pending</span>
                    ) : counterDays(campaignShowDetail.endTime) <= 0 ? (
                      <span className='text-color-red'>Campaign ended</span>
                    ) : (
                      `Ends in ${counterDays(campaignShowDetail.endTime)}`
                    )}
                  </div>
                </div>
              </Col>
              <Col span={24}>
                {campaignShowDetail.canCancel ? (
                  <div className='change-time-campaign'>
                    <Collapse>
                      <Panel header='Change times' key='1'>
                        <Form form={form} layout='vertical' name='control-hooks'>
                          <Form.Item
                            name='times'
                            label='Times'
                            rules={[{ validator: validateTimeChange }]}
                          >
                            <RangePicker
                              showTime={'HH:mm'}
                              format={formatDate}
                              className='input-range-picker'
                              size='large'
                              disabledDate={disabledDate}
                              onChange={changeInputTimeAirdrop}
                              disabled={[
                                campaignShowDetail.startTime < Math.floor(Date.now() / 1000),
                                false,
                              ]}
                            />
                          </Form.Item>
                          {campaignShowDetail.startTime < Math.floor(Date.now() / 1000) ? (
                            <Button
                              type='primary'
                              shape='round'
                              onClick={() => handleExtendCampaign(campaignShowDetail.campaignId)}
                              loading={loadingChangeTime}
                            >
                              Change
                            </Button>
                          ) : (
                            <Button
                              type='primary'
                              shape='round'
                              onClick={() =>
                                handleRescheduleCampaign(campaignShowDetail.campaignId)
                              }
                              loading={loadingChangeTime}
                            >
                              Change
                            </Button>
                          )}
                        </Form>
                      </Panel>
                    </Collapse>
                  </div>
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className='description-airdrop'>
        <div className='header-description textmode'>{campaignShowDetail.titleDescription}</div>
        <div className='content-description textmode'>{campaignShowDetail.description}</div>
      </div>
      <div className='your-left-balance'>
        <h3>
          Your{' '}
          <b>
            $<span>{campaignShowDetail.symbolTokenEarn}</span>
          </b>
          :{' '}
          <span className='balance-token-earn'>
            {parseBalance(campaignShowDetail.balanceTokenEarn, 18)}
          </span>
        </h3>
      </div>
      <div className='your-nft'>
        <h3>Your NFTs:</h3>
        <Row gutter={16}>
          {campaignShowDetail.allNFTsOfOwner
            ? campaignShowDetail.allNFTsOfOwner.map((nft, i) => (
                <Col
                  xs={{ span: 12 }}
                  sm={{ span: 8 }}
                  xl={{ span: 6 }}
                  key={i}
                  className='card-nft'
                >
                  <Card hoverable cover={<img alt={nft.name} src={nft.image} />}>
                    <Meta title={nft.description} description={`${nft.name} (${nft.tokenId})`} />
                  </Card>
                </Col>
              ))
            : ''}
        </Row>
      </div>
    </Modal>
  );
}
