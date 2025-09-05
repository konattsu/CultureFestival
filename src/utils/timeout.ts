/**
 * Promise にタイムアウト機能を追加するユーティリティ
 */
export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage?: string,
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            errorMessage !== undefined
              ? errorMessage
              : `操作がタイムアウトしました (${timeoutMs}ms)`,
          ),
        );
      }, timeoutMs);
    }),
  ]);
};

/**
 * Firebase操作用のデフォルトタイムアウト時間（10秒）
 */
export const FIREBASE_TIMEOUT_MS = 10000;

/**
 * Firebase操作にタイムアウトを適用するヘルパー関数
 */
export const withFirebaseTimeout = <T>(promise: Promise<T>): Promise<T> => {
  return withTimeout(
    promise,
    FIREBASE_TIMEOUT_MS,
    "サーバーへの接続がタイムアウトしました。サーバーがダウンしている可能性があります。",
  );
};
