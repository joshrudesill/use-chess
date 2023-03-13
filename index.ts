type BoardElement = [
  Piece | null,
  Piece | null,
  Piece | null,
  Piece | null,
  Piece | null,
  Piece | null,
  Piece | null,
  Piece | null
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
type Color = "b" | "w";
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
  stringType: string;
  numericType: number;
  color: Color;
  moveHistory: MoveHistory;
  legalMoves: Array<Square>;
}
interface FenError {
  errorType: string;
  message: string;
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

const UCIBoard = [
  ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
  ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
  ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
  ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
  ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
  ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
];
let NonUCIBoard: Board = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];
function Chess(): Board {
  let p: Board = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];
  return p;
}
function LoadFEN(fen: string): void {
  const validation = validateFEN(fen);
  if (validation.valid) {
    parseFENIntoMemory(validation.boardLayout);
  }
}
function parseFENIntoMemory(fen: string): void {
  const boardRows = fen.split("/");
  var temp: any[] = [];
  for (let i = 0; i < 8; i++) {
    const derivedRow = boardRows[i].split("").flatMap((square) => {
      if (isNaN(Number(square))) {
        var p: Piece = {
          hasMoved: false,
          stringType: square.toLowerCase(),
          numericType: parseInt(square),
          color: square.toUpperCase() === square ? "w" : "b",
          moveHistory: [],
          legalMoves: [],
          position: {
            x: 0,
            y: 0,
            UCI: "a1",
          },
        };
      } else {
        return new Array(Number(square)).fill(null);
      }
    });
    temp.push(derivedRow);
  }
  console.log(temp);
}
//Internal
function validateFEN(fen: string): Record<string, any> {
  var errors: FenError[] = [];
  const fenElements: string[] = fen.split(" ");

  if (fenElements.length !== 6) {
    errors.push({
      errorType: "format",
      message: "The fen string you passed is formatted incorrectly",
    });
    return { valid: false, errors };
  } else {
    const boardLayout: string = fenElements[0];
    const colorTurn: string = fenElements[1];
    const castlingRights: string = fenElements[2];
    const enPassantSquare: string = fenElements[3];
    const halfMoves: string = fenElements[4];
    const fullMoves: string = fenElements[5];

    const boardLayoutArray: string[] = boardLayout.split("/");
    if (boardLayoutArray.length !== 8) {
      errors.push({
        errorType: "FEN String: format",
        message: "Incorrect number of board rows",
      });
    }
    const rowRegex = /^[rnbqkpRNBQKP1-8]+$/;
    for (const [index, boardRow] of boardLayoutArray.entries()) {
      if (!rowRegex.test(boardRow)) {
        errors.push({
          errorType: "FEN String: Invalid Piece",
          message: `Row ${
            index + 1
          } of the board in the FEN string has an invalid character`,
        });
      }
    }
    if (!(colorTurn === "w" || colorTurn === "b")) {
      errors.push({
        errorType: "FEN String: Invalid Color",
        message: "The color in your FEN string is not w or b",
      });
    }
    const castlingRegex = /-|[kqKQ]/;
    if (!castlingRegex.test(castlingRights)) {
      errors.push({
        errorType: "FEN String: Invalid castling rights",
        message: "The castling rights you have passed is incorrect",
      });
    }
    const epRegex = /-|[a-h][36]/;
    if (!epRegex.test(enPassantSquare)) {
      errors.push({
        errorType: "FEN String: Invalid en passant",
        message: "The en passant you have passed is incorrect",
      });
    }
    if (isNaN(parseInt(halfMoves)) || isNaN(parseInt(fullMoves))) {
      errors.push({
        errorType: "FEN String: Move counter",
        message:
          "Invalid halfmove clock or fullmove number component in FEN string",
      });
    }
    return errors.length === 0
      ? {
          valid: true,
          boardLayout,
          colorTurn,
          castlingRights,
          enPassantSquare,
          halfMoves,
          fullMoves,
        }
      : { valid: false, errors };
  }
}

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
