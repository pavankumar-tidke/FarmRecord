import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const CustSpin = (props) => {

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: props.size,
        color: props.color,
        fontWeight: 'bolder',
      }}
      spin
    />
  );

  return (  
      <Spin indicator={antIcon} /> 

  );
};

export default CustSpin;
