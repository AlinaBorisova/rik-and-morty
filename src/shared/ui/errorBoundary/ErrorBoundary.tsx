import { Component, type ErrorInfo } from "react";
import type { LoaderErrorPayload } from "../../lib/loaders";

type Props = { children: React.ReactNode };
type State = {
  hasError: boolean;
  error: Error | LoaderErrorPayload | null;
};

function getMessage(error: State["error"]): string {
  if (!error) return "Что-то пошло не так";
  if (typeof error === "object" && error !== null && "__error" in error) {
    const e = error as LoaderErrorPayload;
    if (e.status === 429) return "Слишком много запросов. Подождите немного.";
    if (e.status === 503) return "Ошибка загрузки данных. Проверьте интернет или попробуйте позже.";
    if (e.status === 404) return "Ресурс не найден.";
    return e.message ?? "Ошибка загрузки";
  }
  return error instanceof Error ? error.message : "Что-то пошло не так";
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error | LoaderErrorPayload): Partial<State> {
    console.log('error:', error);
    
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
          <p>{getMessage(this.state.error)}</p>
        </div>
      );
    }

    return this.props.children;
  }
}