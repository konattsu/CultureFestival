// コメントアウト外してたまに使うので allow: unusedで

import React, { useState } from "react";

/**
 * ErrorBoundaryをテストするための開発用コンポーネント
 * 本番環境では削除する予定
 */
const ErrorTestButton: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("テスト用エラー: ErrorBoundaryの動作を確認します");
  }

  const handleThrowError = (): void => {
    setShouldThrow(true);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        onClick={handleThrowError}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        title="ErrorBoundaryをテスト"
      >
        🧪 Error Test
      </button>
    </div>
  );
};

export default ErrorTestButton;
