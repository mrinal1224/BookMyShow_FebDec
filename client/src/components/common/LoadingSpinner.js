import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner = ({ size = 'large', tip = 'Loading...', children }) => {
  return (
    <div className="loading-spinner-container">
      <Spin size={size} tip={tip}>
        {children}
      </Spin>
    </div>
  );
};

export default LoadingSpinner;