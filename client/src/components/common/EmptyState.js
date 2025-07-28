import React from 'react';
import { Empty, Button } from 'antd';

const EmptyState = ({ 
  title = 'No data found', 
  description, 
  actionText, 
  onAction,
  image 
}) => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Empty
        image={image}
        description={
          <div>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            }
          </div>
        }
      >
        {actionText && onAction && (
          <Button type="primary" onClick={onAction}>
            {actionText}
          </Button>
        )}
      </Empty>
    </div>
  );
};

export default EmptyState;