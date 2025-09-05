import React from "react";
import { useSearchParams } from "react-router-dom";

import MagazineList from "./Magazine/MagazineList";
import MagazinePostDetail from "./Magazine/MagazinePostDetail";

// メインコンポーネント
const Magazine: React.FC = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("post");

  if (postId !== null && postId.length > 0) {
    return <MagazinePostDetail postId={postId} />;
  }

  return <MagazineList />;
};

export default Magazine;
