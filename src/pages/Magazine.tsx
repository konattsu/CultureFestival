import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MagazineList from "./Magazine/MagazineList";
import MagazinePostDetail from "./Magazine/MagazinePostDetail";

// メインコンポーネント
const Magazine: React.FC = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("post");

  // 部誌の記事またはリストに移動したときに画面を一番上にスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (postId !== null && postId.length > 0) {
    return <MagazinePostDetail postId={postId} />;
  }

  return <MagazineList />;
};

export default Magazine;
