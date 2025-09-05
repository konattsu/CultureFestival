import React from "react";
import { useSearchParams } from "react-router-dom";

import BoardView from "./BulletinBoard/BoardView";
import BulletinBoardList from "./BulletinBoard/BulletinBoardList";
import { BOARD_IDS } from "./BulletinBoard/types";

import type { BoardId } from "./BulletinBoard/types";

const BulletinBoard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("board") as BoardId | null;

  if (
    boardId !== null &&
    Object.values(BOARD_IDS).includes(boardId as BoardId)
  ) {
    return <BoardView boardId={boardId as BoardId} />;
  }

  return <BulletinBoardList />;
};

export default BulletinBoard;
