type BoardElement = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
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
    ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
  ];
  return b;
}

/*
piecesOnBoard: {
  pawns: [{Piece}, ...],
  rooks: [{Piece}, ...],
  ...
}
['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8']
 */
