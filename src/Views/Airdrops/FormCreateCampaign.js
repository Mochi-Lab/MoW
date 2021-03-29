import { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  InputNumber,
  message,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { fetchListCampaign, addCampaign, checkAllowance, approveERC20 } from 'store/actions';
import store from 'store/index';
import './index.css';
import { useSelector } from 'react-redux';
import { connectWeb3Modal } from 'Connections/web3Modal';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default function FormCreateCampaign() {
  const [form] = Form.useForm();

  const { walletAddress, web3 } = useSelector((state) => state);

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [titleShort, setTitleShort] = useState();
  const [slogan, setSlogan] = useState();
  const [titleDescription, setTitleDescription] = useState();
  const [description, setDescription] = useState();
  const [nftAddress, setNftAddress] = useState();
  const [tokenAddress, setTokenAddress] = useState();
  const [totalFunds, setTotalFunds] = useState();
  const [amountPerClaim, setAmountPerClaim] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [loadingApprove, setloadingApprove] = useState(false);
  const [iconToken, setIconToken] = useState();
  const [bannerImg, setBannerImg] = useState();
  const [loadingCreate, setLoadingCreate] = useState(false);

  const changeShortTitle = async (e) => {
    let value = e.target.value;
    setTitleShort(value);
  };
  const changeSlogan = async (e) => {
    let value = e.target.value;
    setSlogan(value);
  };
  const changeNftAddress = async (e) => {
    let address = e.target.value;
    setNftAddress(address);
  };

  const changeTokenAddress = async (e) => {
    let address = e.target.value;
    setTokenAddress(address);
  };
  const changeTotalFunds = async (amount) => {
    setTotalFunds(amount);
  };
  const changeAmountPerClaim = async (amount) => {
    setAmountPerClaim(amount);
  };
  const changeTimeAirdrop = async (time) => {
    if (time) {
      const [startTime, endTime] = time;
      setStartTime(startTime.unix());
      setEndTime(endTime.unix());
    }
  };
  const changeTitleDescription = async (e) => {
    let value = e.target.value;
    setTitleDescription(value);
  };
  const changeDescription = async (e) => {
    let value = e.target.value;
    setDescription(value);
  };
  function disabledDate(current) {
    return current && current < moment().subtract(1, 'days');
  }
  async function handleClickCreate(current) {
    if (!walletAddress) {
      await connectWeb3Modal();
    }
    await setShowModalCreate(true);
  }

  const compareTotal = (_, value) => {
    if (!!value) {
      if (value <= totalFunds) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("'Claim per user' must less than 'Total claim'"));
    } else {
      return Promise.reject();
    }
  };
  const validateTokenClaim = async (_, value) => {
    if (!!value) {
      if (!!web3.utils.isAddress(value)) {
        if ((await web3.eth.getCode(value)) === '0x') {
          return Promise.reject(new Error('Contract not exist'));
        }
        let allow = await store.dispatch(checkAllowance(value));
        if (allow > 0) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            <div>
              Must approve token for contract{' '}
              <Button
                size='small'
                shape='round'
                type='primary'
                onClick={() => approveToken()}
                loading={loadingApprove}
              >
                Approve
              </Button>
            </div>
          );
        }
      } else {
        return Promise.reject(new Error('Not is address'));
      }
    } else {
      return Promise.reject();
    }
  };

  async function approveToken() {
    setloadingApprove(true);
    form.validateFields(['tokenAddress']);
    await store.dispatch(approveERC20(tokenAddress));
    form.validateFields(['tokenAddress']);
    setloadingApprove(false);
  }

  const createCampaign = async () => {
    let fieldErrors = null;
    try {
      await form.validateFields();
    } catch (errorInfo) {
      fieldErrors = errorInfo.errorFields;
    }
    if (!fieldErrors) {
      setLoadingCreate(true);
      var result = await store.dispatch(
        addCampaign(
          nftAddress,
          tokenAddress,
          totalFunds,
          amountPerClaim,
          startTime,
          endTime,
          titleShort,
          slogan,
          titleDescription,
          description,
          iconToken,
          bannerImg
        )
      );
      if (result) {
        await store.dispatch(fetchListCampaign());
        setShowModalCreate(false);
        form.resetFields();
        setIconToken(null);
        setBannerImg(null);
      }
      setLoadingCreate(false);
    }
  };

  function beforeUpload(file, type) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return;
    }
    if (type === 'icon') {
      setIconToken(file);
    }

    if (type === 'banner') {
      setBannerImg(file);
    }
  }

  const preViewImg = (file) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className='box-create-airdrop'>
      <Button
        type='primary'
        shape='round'
        icon={<PlusOutlined />}
        size='large'
        className='btn-create-airdrop'
        onClick={() => handleClickCreate()}
      >
        Create Airdrop
      </Button>
      <Modal
        visible={showModalCreate}
        width={600}
        title={<h3 className='textmode'>Create Airdrop</h3>}
        onOk={() => setShowModalCreate(false)}
        onCancel={() => setShowModalCreate(false)}
        className='modal-create'
        footer={[
          <Button key='cancel' onClick={() => setShowModalCreate(false)} shape='round' size='large'>
            Cancel
          </Button>,

          <Button
            key='create'
            type='primary'
            onClick={() => createCampaign()}
            shape='round'
            size='large'
            loading={loadingCreate}
          >
            Create
          </Button>,
        ]}
      >
        <div className='content-create-airdrop'>
          <Form layout='vertical' form={form}>
            <Row gutter={8}>
              <Col xs={{ span: 8 }} sm={{ span: 6 }} md={{ span: 6 }}>
                <div className='ant-col ant-form-item-label'>
                  <label title='Icon token'>Token Icon</label>
                </div>
                <div className='ant-col ant-form-item-control'>
                  <div className='ant-form-item-control-input'>
                    <div className='ant-form-item-control-input-content'>
                      <Upload
                        name='avatar'
                        listType='picture-card'
                        className='avatar-uploader'
                        showUploadList={false}
                        beforeUpload={(e) => beforeUpload(e, 'icon')}
                      >
                        {iconToken ? (
                          <img src={preViewImg(iconToken)} alt='avatar' style={{ width: '100%' }} />
                        ) : (
                          <div>
                            <PlusOutlined className='textmode' />
                            <div style={{ marginTop: 8 }}>Icon</div>
                          </div>
                        )}
                      </Upload>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={{ span: 16 }} sm={{ span: 18 }} md={{ span: 18 }}>
                <div className='ant-col ant-form-item-label'>
                  <label title='Banner'>Banner</label>
                </div>
                <div className='ant-col ant-form-item-control banner-img'>
                  <div className='ant-form-item-control-input'>
                    <div className='ant-form-item-control-input-content'>
                      <Upload
                        name='avatar'
                        listType='picture-card'
                        className='avatar-uploader'
                        showUploadList={false}
                        beforeUpload={(e) => beforeUpload(e, 'banner')}
                      >
                        {bannerImg ? (
                          <img src={preViewImg(bannerImg)} alt='avatar' style={{ width: '100%' }} />
                        ) : (
                          <div>
                            <PlusOutlined className='textmode' />
                            <div style={{ marginTop: 8 }}>Banner</div>
                          </div>
                        )}
                      </Upload>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Form.Item
              label='Title'
              name='titleShort'
              rules={[{ required: true, message: "'Title' is required" }]}
            >
              <Input
                placeholder='title'
                size='large'
                value={titleShort}
                onChange={changeShortTitle}
              />
            </Form.Item>
            <Form.Item
              label='Slogan'
              name='slogan'
              rules={[{ required: true, message: "'Slogan' is required" }]}
            >
              <Input placeholder='slogan' size='large' value={slogan} onChange={changeSlogan} />
            </Form.Item>
            <Form.Item
              label='NFT Address'
              hasFeedback
              name='nftAddress'
              rules={[{ required: true, message: "'NFT Address' is required" }]}
            >
              <Input
                placeholder='nft address'
                size='large'
                onChange={changeNftAddress}
                value={nftAddress}
              />
            </Form.Item>

            <Form.Item
              label='Airdrop token'
              name='tokenAddress'
              rules={[
                { required: true, message: "'Airdrop token' is required" },
                {
                  validator: validateTokenClaim,
                },
              ]}
              hasFeedback
              style={{ marginBottom: '0.5rem' }}
            >
              <Input
                placeholder='airdrop token'
                size='large'
                value={tokenAddress}
                onChange={changeTokenAddress}
                style={{ marginBottom: '0.5rem' }}
              />
            </Form.Item>
            <Row gutter={8}>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  name='amount'
                  label='Total claim'
                  rules={[
                    { required: true, message: "'Total claim' is required" },
                    { type: 'number', min: 0 },
                  ]}
                >
                  <InputNumber
                    placeholder='total claim'
                    size='large'
                    min='1'
                    style={{ width: `100%`, borderRadius: '0.5rem' }}
                    value={totalFunds}
                    onChange={changeTotalFunds}
                  />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  name='amountPer'
                  label='Claim per user'
                  rules={[
                    { required: true, message: "'Claim per user' is required" },
                    { type: 'number', min: 0 },
                    {
                      validator: compareTotal,
                    },
                  ]}
                >
                  <InputNumber
                    placeholder='claim per user'
                    size='large'
                    min='1'
                    style={{ width: `100%`, borderRadius: '0.5rem' }}
                    value={amountPerClaim}
                    onChange={changeAmountPerClaim}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label='Time airdrop'
              name='startEndTime'
              rules={[{ required: true, message: "'Time airdrop' is required" }]}
            >
              <RangePicker
                showTime
                format='YYYY/MM/DD HH:mm:ss'
                style={{ width: '100%', borderRadius: '0.5rem' }}
                size='large'
                disabledDate={disabledDate}
                onChange={changeTimeAirdrop}
              />
            </Form.Item>
            <Form.Item
              label='Short description'
              name='titleDescription'
              rules={[
                { required: true, message: "'Short description' is required" },
                { min: 16, message: "'Description' must be at least 16 characters" },
              ]}
            >
              <TextArea rows={3} value={titleDescription} onChange={changeTitleDescription} />
            </Form.Item>
            <Form.Item
              label='Description'
              name='description'
              rules={[
                { required: true, message: "'Description' is required" },
                { min: 50, message: "'Description' must be at least 50 characters" },
              ]}
            >
              <TextArea rows={4} value={description} onChange={changeDescription} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
