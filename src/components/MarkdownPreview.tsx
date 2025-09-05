import React, { useState, useEffect } from "react";

import mermaid from "mermaid";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";

// コードブロック用のカスタムコンポーネント
interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
  node?: unknown;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
  inline,
  node,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className ?? "");
  const language = match?.[1] ?? "";

  if (inline === true) {
    return (
      <code
        className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </code>
    );
  }

  // Mermaidチャートの場合
  if (language === "mermaid") {
    return <MermaidChart chart={String(children).replace(/\n$/, "")} />;
  }

  return (
    <div className="relative my-4">
      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

// Mermaid コンポーネント
interface MermaidProps {
  chart: string;
}

const MermaidChart: React.FC<MermaidProps> = ({ chart }) => {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const renderChart = async (): Promise<void> => {
      try {
        setError("");
        // Mermaid初期化
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
          suppressErrorRendering: true,
        });

        // SVG生成
        const { svg } = await mermaid.render("mermaid-chart", chart);
        setSvg(svg);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Chart rendering failed");
      }
    };

    if (chart.trim() !== "") {
      void renderChart();
    } else {
      setSvg("");
    }
  }, [chart]);

  if (error !== "") {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-3 text-red-700 dark:border-red-600 dark:bg-red-900/30 dark:text-red-400">
        {error}
      </div>
    );
  }

  return svg !== "" ? (
    <div
      className="mermaid-container flex justify-center rounded-lg bg-yellow-50 p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  ) : null;
};

// Markdown プレビューコンポーネント
interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkToc, remarkGfm, remarkMath, remarkBreaks]}
        rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
        components={{
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
