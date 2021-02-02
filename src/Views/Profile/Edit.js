import { useState, useEffect } from 'react';
import { CameraOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import EditProfile from '3box-profile-edit-react';

import './index.css';
import { setSpace } from 'store/actions';

export default function Edit() {
  const dispatch = useDispatch();
  const { threeBoxProfile, box, walletAddress, space } = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getSpace = async () => {
      if (box) {
        const space = await box.openSpace('chobuaNFT');
        await box.syncDone;
        dispatch(setSpace(space));
      }
    };
    getSpace();
  }, [dispatch, box]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div
        className='change-image'
        style={{ display: 'flex', padding: '5px 10px' }}
        onClick={showModal}
      >
        <CameraOutlined style={{ fontSize: '20px' }} />
        <p style={{ paddingLeft: '5px', margin: 0 }}>
          <strong>Edit your profile</strong>
        </p>
      </div>
      <Modal
        title={
          <p style={{ textAlign: 'center', color: 'teal', fontSize: '1.5rem', margin: 0 }}>
            Edit your 3Box Profile here 👇
          </p>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<div />}
        width={598}
      >
        <EditProfile
          box={box}
          space={space}
          currentUserAddr={walletAddress}
          currentUser3BoxProfile={threeBoxProfile}
          redirectFn={() => setIsModalVisible(false)}
        />
      </Modal>
    </>
  );
}
