import React, { useEffect } from "react";

interface ContentPageLayoutProps {
  children: React.ReactNode;
  title: string;
  svgSymbols?: React.ReactNode;
}

const ContentPageLayout: React.FC<ContentPageLayoutProps> = ({
  children,
  title,
  svgSymbols,
}) => {
  // Update the document title on mount
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${title} | 数学部`;

    return (): void => {
      document.title = originalTitle;
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {svgSymbols !== null && <div className="hidden">{svgSymbols}</div>}

      <main className="container mx-auto px-4 py-8">
        <h1 className="mt-8 mb-14 text-center text-3xl font-bold">{title}</h1>
        <div className="max-w-none leading-7">{children}</div>
      </main>
    </div>
  );
};

export default ContentPageLayout;
