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
  stringerrorType: PieceType;
  numericerrorType: 0 | 1 | 2 | 3 | 4 | 5;
  white: boolean;
  moveHistory: MoveHistory;
}

interface GameState {
  lastMove: {
    from: PiecePosition;
    to: PiecePosition;
    promotion: boolean;
    enPassant: boolean;
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
function LoadFEN(fen: string): void {}
function validateFEN(fen) {
  var errors: Array<object> = [];

  const regex =
    /^([rnbqkpRNBQKP1-8]{1,8}\/){7}[rnbqkpRNBQKP1-8]{1,8} [wb-] ([KQkq-]{1,4}) ([a-h][1-8]|-) (\d+) (\d+)$/g;
  const match = regex.exec(fen);
  if (!match) {
    errors.push({ errorType: "format", message: "Invalid FEN string format." });
  } else {
    const ranks = match[1].split("/");
    if (ranks.length !== 8) {
      errors.push({ errorType: "ranks", message: "Invalid number of ranks." });
    }

    const validPieces = [
      "p",
      "P",
      "r",
      "R",
      "n",
      "N",
      "b",
      "B",
      "q",
      "Q",
      "k",
      "K",
    ];
    for (let i = 0; i < 8; i++) {
      const rank = ranks[i];
      let file = 0;
      for (let j = 0; j < rank.length; j++) {
        const char = rank.charAt(j);
        if (char >= "1" && char <= "8") {
          file += parseInt(char);
        } else if (validPieces.includes(char)) {
          file++;
        } else {
          errors.push({
            errorType: "pieces",
            message: "Invalid piece or rank.",
          });
        }
      }
      if (file !== 8) {
        errors.push({
          errorType: "files",
          message: "Invalid number of files.",
        });
      }
    }

    const activeColor = match[2];
    if (activeColor !== "w" && activeColor !== "b") {
      errors.push({ errorType: "color", message: "Invalid active color." });
    }

    const castling = match[3];
    const validCastling = /^(-|[KQkq]+)$/;
    if (!validCastling.test(castling)) {
      errors.push({
        errorType: "castling",
        message: "Invalid castling rights.",
      });
    }

    const enPassant = match[4];
    if (
      enPassant !== "-" &&
      (!/^[a-h][1-8]$/.test(enPassant) ||
        (activeColor === "w" && enPassant.charAt(1) !== "6") ||
        (activeColor === "b" && enPassant.charAt(1) !== "3"))
    ) {
      errors.push({
        errorType: "enPassant",
        message: "Invalid en passant target square.",
      });
    }

    const halfMoveClock = parseInt(match[5]);
    if (isNaN(halfMoveClock) || halfMoveClock < 0) {
      errors.push({
        errorType: "halfMoveClock",
        message: "Invalid half move clock.",
      });
    }

    const fullMoveNumber = parseInt(match[6]);
    if (isNaN(fullMoveNumber) || fullMoveNumber < 1) {
      errors.push({
        errorType: "fullMoveNumber",
        message: "Invalid full move number.",
      });
    }
  }

  return errors.length ? errors : true;
}

validateFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

function LoadUCI(): void {}
function DisplayLegalMoves(): void {}
function ShowASCII(): void {}
function ShowFEN(): void {}
function ShowBoardObject(): void {}
function putPieceOnSquare(): void {} // remove piece too
function getSquare(): void {}
function move(): void {}
function undo(): void {}
function moveHistory(): void {}
// game state stuff
function inCheck(): void {}
function isAttacked(): void {}
function isCheckmate(): void {}
function isDraw(): void {}
function isInsufficient(): void {}
function isThreeFold(): void {}
function turn(): void {}
/*
piecesOnBoard: {
  pawns: ['e4', ...],
  rooks: ['h1', ...],
  ...
}

 */
