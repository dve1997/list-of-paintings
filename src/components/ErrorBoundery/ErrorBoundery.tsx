import { Component, ErrorInfo, ReactNode } from 'react';

import './errorBoundery.modules.scss';

// Функциональный компонент ошибки для компонента ErrorBoundary
function ErrorMessage() {
  return <h1>Что-то пошло не так...</h1>;
}

// Интерфейс описывающий свойства классового компонента
interface PropsErrorBoundery {
  children: ReactNode;
}

// Интерфейс описывающий состояние классового компонента
interface StateErrorBoundery {
  hasError: boolean;
}

// Классовый компонент границы ошибок
class ErrorBoundary extends Component<PropsErrorBoundery, StateErrorBoundery> {
  constructor(props: PropsErrorBoundery) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return <ErrorMessage />;
    }

    return children;
  }
}

export default ErrorBoundary;
