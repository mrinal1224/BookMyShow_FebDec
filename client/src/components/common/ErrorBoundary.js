import React from 'react';
import { Result, Button } from 'antd';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <Result
            status="500"
            title="Something went wrong"
            subTitle="We're sorry, but something unexpected happened. Please try refreshing the page."
            extra={
              <Button 
                type="primary" 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;