import { Component, type ErrorInfo } from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean, error: Error | null };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    console.log('error:', error.message);

    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('error:', error);
    console.log('errorInfo:', errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h4>Что-то пошло не так</h4>
          {this.state.error && <p>{this.state.error.message}</p>}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;