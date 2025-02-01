import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error', error, errorInfo);
  }
  onClickTryAgain = () => {
    window.location.reload();
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div>
          <h1>Ooops... something went wrong!</h1>
          <button onClick={this.onClickTryAgain}>Try again!</button>
        </div>
      );
    }

    return children;
  }
}

export { ErrorBoundary };
