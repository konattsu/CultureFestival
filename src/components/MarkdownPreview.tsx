import React, { useState, useEffect } from "react";

import mermaid from "mermaid";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

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
      className="mermaid-container"
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

  const contentParts = renderContentWithMermaid(content);

  return (
    <div
      className={`prose prose-gray dark:prose-invert max-w-none ${className}`}
    >
      {contentParts.map((part, index) => {
        if (part.type === "mermaid") {
          return <MermaidChart key={index} chart={part.content} />;
        } else {
          return (
            <ReactMarkdown
              key={index}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeHighlight]}
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
