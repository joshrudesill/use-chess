type BoardElement = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];
type Board = [
  BoardElement,
  BoardElement,
  BoardElement,
  BoardElement,
  BoardElement,
  BoardElement,
  BoardElement,
  BoardElement
];
type PiecePositionRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type PieceType = "p" | "q" | "r" | "n" | "k" | "b";
type MoveHistory = Array<Move>;
interface Square {
  x: PiecePositionRange;
  y: PiecePositionRange;
  UCI: string;
}
interface PiecePosition {
  x: PiecePositionRange;
  y: PiecePositionRange;
  UCI: string;
}

interface Move {
  from: PiecePosition;
  to: PiecePosition;
  capture: boolean;
  promotion: boolean;
  capturedPiece: PieceType | undefined;
  promotedTo: PieceType | undefined;
}

interface Piece {
  position: PiecePosition;
  hasMoved: boolean;
  stringType: PieceType;
  numericType: 0 | 1 | 2 | 3 | 4 | 5;
  white: boolean;
  moveHistory: MoveHistory;
}

interface GameState {
  lastMove: {
    from: PiecePosition;
    to: PiecePosition;
  };
  moveHistory: MoveHistory;
}

function Chess(): Board {
  let b: Board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  return b;
}

/*
piecesOnBoard: {
  pawns: [{Piece}, ...],
  rooks: [{Piece}, ...],
  ...
}
 */
