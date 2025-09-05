import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // エラーが発生したときにstateを更新してフォールバックUIを表示
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // エラーログ送信など
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env.DEV;

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-gray-900 dark:bg-gray-900 dark:text-white">
          <div className="max-w-2xl text-center">
            <h1 className="mb-6 text-3xl font-bold">エラーが発生しました</h1>

            <p className="mb-8 text-lg">
              申し訳ございません。予期しないエラーが発生しました。
              <br />
              ページをリロードするか、しばらく時間をおいて再度お試しください。
            </p>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReload}
                className="rounded bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                ページをリロード
              </button>
              <button
                onClick={this.handleReset}
                className="rounded bg-gray-600 px-6 py-3 text-white transition-colors hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600"
              >
                再試行
              </button>
            </div>

            {isDevelopment && this.state.error != null && (
              <details className="mt-8 rounded bg-gray-100 p-4 text-left dark:bg-gray-800">
                <summary className="cursor-pointer font-semibold text-red-600 dark:text-red-400">
                  開発者向け情報（本番環境では表示されません）
                </summary>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-semibold">エラーメッセージ:</h3>
                    <pre className="mt-2 overflow-auto rounded bg-red-50 p-2 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
                      {this.state.error.message}
                    </pre>
                  </div>
                  {this.state.error.stack != null &&
                    this.state.error.stack.length > 0 && (
                      <div>
                        <h3 className="font-semibold">スタックトレース:</h3>
                        <pre className="mt-2 overflow-auto rounded bg-red-50 p-2 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                  {this.state.errorInfo != null && (
                    <div>
                      <h3 className="font-semibold">コンポーネントスタック:</h3>
                      <pre className="mt-2 overflow-auto rounded bg-red-50 p-2 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
