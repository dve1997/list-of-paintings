import { Component, ErrorInfo, ReactNode } from 'react';

// import errorBoundary from './errorBoundery.modules.scss';

function ErrorMessage() {
  return <h1>Что-то пошло не так...</h1>;
}

interface PropsErrorBoundery {
  children: ReactNode;
}
interface StateErrorBoundery {
  hasError: boolean;
}

class ErrorBoundary extends Component<PropsErrorBoundery, StateErrorBoundery> {
  constructor(props: PropsErrorBoundery) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorMessage />;
    }

    return children;
  }
}

export default ErrorBoundary;
