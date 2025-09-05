import React, { useState, useEffect, useRef } from "react";

import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";

import ContentPageLayout from "../../components/ContentPageLayout";

interface PyodideInterface {
  runPython: (code: string) => unknown;

  loadPackage: (packages: string | string[]) => Promise<void>;
}

declare global {
  interface Window {
    loadPyodide: (options: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

const Programming: React.FC = () => {
  const [code, setCode] = useState(`print("Hello, world!")`);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [installingPackages, setInstallingPackages] = useState<string[]>([]);
  const pyodideRef = useRef<PyodideInterface | null>(null);

  // よく使われるPythonパッケージとそのPyodide名のマッピング
  const packageMap: { [key: string]: string } = {
    numpy: "numpy",
    pandas: "pandas",
    matplotlib: "matplotlib",
    scipy: "scipy",
    sklearn: "scikit-learn",
    requests: "requests",
    sympy: "sympy",
    pillow: "Pillow",
    bs4: "beautifulsoup4",
    cv2: "opencv-python",
  };

  // コードから必要なパッケージを自動検出する関数
  const detectRequiredPackages = (code: string): string[] => {
    const packages = new Set<string>();
    const lines = code.split("\n");

    for (const line of lines) {
      const trimmedLine = line.trim();

      // import文を検出
      const importMatch = trimmedLine.match(
        /^(?:import|from)\s+([a-zA-Z_][a-zA-Z0-9_]*)/,
      );
      if (importMatch !== null) {
        const packageName = importMatch[1];
        if (
          packageMap[packageName] !== undefined &&
          packageMap[packageName] !== ""
        ) {
          packages.add(packageMap[packageName]);
        }
      }
    }

    return Array.from(packages);
  };

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        // Load Pyodide script
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        script.async = true;

        script.onload = async (): Promise<void> => {
          try {
            const pyodide = await window.loadPyodide({
              indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
            });
            pyodideRef.current = pyodide;
            setIsLoading(false);
          } catch (err) {
            console.error("Failed to initialize Pyodide:", err);
            setError("Pyodideの初期化に失敗しました");
            setIsLoading(false);
          }
        };

        script.onerror = (): void => {
          setError("Pyodideの読み込みに失敗しました");
          setIsLoading(false);
        };

        document.head.appendChild(script);

        return (): void => {
          document.head.removeChild(script);
        };
      } catch (err) {
        console.error("Error loading Pyodide:", err);
        setError("Pyodideの読み込みでエラーが発生しました");
        setIsLoading(false);
      }
    };

    void loadPyodide();
  }, []);

  const runCode = async (): Promise<void> => {
    if (pyodideRef.current === null) {
      setOutput("Pyodideが初期化されていません");
      return;
    }

    setIsRunning(true);
    setOutput("コードを解析中...");

    try {
      // 必要なパッケージを検出
      const requiredPackages = detectRequiredPackages(code);

      if (requiredPackages.length > 0) {
        setInstallingPackages(requiredPackages);
        setOutput(
          `パッケージをインストール中: ${requiredPackages.join(", ")}...`,
        );

        // パッケージを一括インストール
        await pyodideRef.current.loadPackage(requiredPackages);
        setOutput("パッケージのインストールが完了しました。コードを実行中...");
      }

      // Capture stdout
      pyodideRef.current.runPython(`
import sys
import io
sys.stdout = io.StringIO()
`);

      // Run user code
      pyodideRef.current.runPython(code);

      // Get output
      const result = pyodideRef.current.runPython("sys.stdout.getvalue()");
      const outputText =
        typeof result === "string" ? result : String(result ?? "");
      setOutput(
        outputText.length > 0
          ? outputText
          : "実行が完了しました（出力はありません）",
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setOutput(`エラー: ${errorMessage}`);
    } finally {
      setIsRunning(false);
      setInstallingPackages([]);
    }
  };

  const clearOutput = (): void => {
    setOutput("");
  };

  // プリセットサンプルコード
  const sampleCodes = {
    "Hello World": `print("Hello, world!")`,
    NumPy基本: `import numpy as np

# NumPyの基本操作
arr = np.array([1, 2, 3, 4, 5])
print(f"配列: {arr}")
print(f"平均: {np.mean(arr)}")
print(f"合計: {np.sum(arr)}")`,
    "Matplotlib グラフ": `import matplotlib.pyplot as plt
import numpy as np

# データ作成
x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

# グラフ描画
plt.figure(figsize=(8, 6))
plt.plot(x, y, 'b-', linewidth=2, label='sin(x)')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Sine Wave')
plt.legend()
plt.grid(True)
plt.show()`,
    "Pandas データ処理": `import pandas as pd
import numpy as np

# データフレーム作成
data = {
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['Tokyo', 'Osaka', 'Kyoto']
}

df = pd.DataFrame(data)
print("データフレーム:")
print(df)
print(f"\\n平均年齢: {df['age'].mean()}")`,
  };

  const loadSampleCode = (sampleName: keyof typeof sampleCodes): void => {
    setCode(sampleCodes[sampleName]);
    setOutput("");
  };
  return (
    <ContentPageLayout title="Hello World">
      <div className="prose dark:prose-invert max-w-none">
        <p>
          "Hello,
          world!"という文字列は、環境構築が終わった時のテスト、プログラミング学習の第一歩などの場面で使用されます。プログラミングに没頭するようになった理由の一つに"Hello,
          world!"の出力に感動したからだという人も少なくないはずです。疑似的に皆様方にこの体験をしていただけるようこのコンテンツを作成しました。
        </p>

        <h2>歴史</h2>
        <p>
          「Hello,
          world!」を使う理由ははっきりと解明されていませんが、起源は明確に残されています。「ブライアン・カーニハン」さんと「デニス・リッチー」さんが1978年に出版された「プログラミング言語C」という本に記述されました。
          同著書のプログラムの例は"hello,
          world"(大文字無し、感嘆符(!)無し)を標準出力するものです。
          <br />
          具体的なコードは以下のようになります。
        </p>

        <div className="not-prose my-6">
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <pre className="text-sm text-gray-900 dark:text-gray-100">
              <code>{`main() {
  printf("hello, world\\n");
}`}</code>
            </pre>
          </div>
        </div>

        <h2>Python で試してみよう</h2>
        <p>
          下記のPython実行環境で、Hello
          Worldを出力してみましょう。コードを編集して実行ボタンをクリックしてください。
          NumPy、Pandas、Matplotlibなどの一般的なパッケージは自動でインストールされます。
        </p>

        <div className="not-prose my-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            サンプルコード
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(sampleCodes).map((sampleName) => (
              <button
                key={sampleName}
                onClick={() =>
                  loadSampleCode(sampleName as keyof typeof sampleCodes)
                }
                className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
              >
                {sampleName}
              </button>
            ))}
          </div>
        </div>

        <div className="not-prose my-8">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="rounded-t-lg border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Python IDE
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => void runCode()}
                    disabled={isLoading || error !== null || isRunning}
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {isLoading
                      ? "読み込み中..."
                      : isRunning
                        ? installingPackages.length > 0
                          ? `インストール中: ${installingPackages.join(", ")}`
                          : "実行中..."
                        : "実行"}
                  </button>
                  <button
                    onClick={clearOutput}
                    className="rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
                  >
                    クリア
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="border-b border-gray-200 lg:border-r lg:border-b-0 dark:border-gray-700">
                <div className="border-b border-gray-200 bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                  コードエディタ
                </div>
                <CodeMirror
                  value={code}
                  onChange={(val) => setCode(val)}
                  extensions={[python()]}
                  theme={oneDark}
                  basicSetup={{
                    lineNumbers: true,
                    foldGutter: true,
                    dropCursor: false,
                    allowMultipleSelections: false,
                  }}
                  height="300px"
                />
              </div>

              <div>
                <div className="border-b border-gray-200 bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                  出力
                </div>
                <div className="h-[300px] overflow-auto bg-black p-4 font-mono text-sm text-green-400">
                  {isLoading && (
                    <div className="text-yellow-400">
                      Pyodide環境を初期化しています...
                    </div>
                  )}
                  {error !== null && (
                    <div className="text-red-400">{error}</div>
                  )}
                  {!isLoading && error === null && (
                    <pre className="whitespace-pre-wrap">
                      {output.length > 0
                        ? output
                        : "コードを実行すると結果がここに表示されます"}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  );
};

export default Programming;
