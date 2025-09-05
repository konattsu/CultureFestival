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

import CopyButton from "./CopyButton";

// コードブロック用のカスタムコンポーネント
interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
  inline,
}) => {
  if (inline === true) {
    return <code className={className}>{children}</code>;
  }

  const codeContent = String(children);

  return (
    <div className="relative">
      <pre className={className}>
        <code>{children}</code>
      </pre>
      <div className="absolute top-2 right-2">
        <CopyButton content={codeContent} />
      </div>
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
  // Mermaidブロックを検出してレンダリング
  const renderContentWithMermaid = (
    text: string,
  ): Array<{ type: "text" | "mermaid"; content: string }> => {
    const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
    const parts: Array<{ type: "text" | "mermaid"; content: string }> = [];
    let lastIndex = 0;

    let match;
    while ((match = mermaidRegex.exec(text)) !== null) {
      // マッチ前のテキスト
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }

      // Mermaidチャート
      parts.push({
        type: "mermaid",
        content: match[1],
      });

      lastIndex = match.index + match[0].length;
    }

    // 残りのテキスト
    if (lastIndex < text.length) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex),
      });
    }

    return parts;
  };

  // 連続した改行を処理するための前処理
  const preprocessContent = (content: string): string => {
    // 連続した改行をHTMLの<br>タグに置換
    return content.replace(/\n\n+/g, (match) => {
      const lineBreaks = match.length - 1; // 最初の\nを除く
      return `\n${"<br/>".repeat(lineBreaks)}\n`;
    });
  };

  const contentParts = renderContentWithMermaid(preprocessContent(content));

  return (
    <div
      className={`prose dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded max-w-none ${className}`}
    >
      {contentParts.map((part, index) => {
        if (part.type === "mermaid") {
          return <MermaidChart key={index} chart={part.content} />;
        } else {
          return (
            <ReactMarkdown
              key={index}
              remarkPlugins={[remarkToc, remarkGfm, remarkMath, remarkBreaks]}
              rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
              components={{
                code: CodeBlock,
              }}
            >
              {part.content}
            </ReactMarkdown>
          );
        }
      })}
    </div>
  );
};

export default MarkdownPreview;
