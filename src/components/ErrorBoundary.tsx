import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // エラーログ送信など
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
          <h1 className="mb-4 text-2xl font-bold">エラーが発生しました</h1>
          <p className="mb-2">
            ページをリロードするか、管理者にご連絡ください。
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
