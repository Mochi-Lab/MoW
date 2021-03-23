import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

export default function BackButton() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <Button type='text' onClick={goBack} icon={<ArrowLeftOutlined />} className='textmode'>
      Go Back
    </Button>
  );
}
