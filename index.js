function Chess() {
  let b = [
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
function LoadFEN(fen) {}
function validateFEN(fen) {
  var errors = [];
  const fenElements = fen.split(" ");
  if (fenElements.length !== 6) {
    errors.push({
      errorType: "format",
      message: "The fen string you passed is formatted incorrectly",
    });
    return { valid: false, errors };
  } else {
    const boardLayout = fenElements[0];
    const colorTurn = fenElements[1];
    const castlingRights = fenElements[2];
    const enPassantSquare = fenElements[3];
    const halfMoves = fenElements[4];
    const fullMoves = fenElements[5];
    const boardLayoutArray = boardLayout.split("/");
    if (boardLayoutArray.length !== 8) {
      errors.push({
        errorType: "format",
        message: "FEN String: Incorrect number of board rows",
      });
    }
    const rowRegex = /^[rnbqkpRNBQKP1-8]+$/;
    for (const [index, boardRow] of boardLayoutArray.entries()) {
      if (!rowRegex.test(boardRow)) {
        errors.push({
          errorType: "Invalid Piece",
          message: `Row ${
            index + 1
          } of the board in the FEN string has an invalid character`,
        });
      }
    }
    if (!(colorTurn === "w" || colorTurn === "b")) {
      errors.push({
        errorType: "Invalid Color",
        message: "The color in your FEN string is not w or b",
      });
    }
    const castlingRegex = /-|[kqKQ]/;
    if (!castlingRegex.test(castlingRights)) {
      errors.push({
        errorType: "Invalid castling rights",
        message: "The castling rights you have passed is incorrect",
      });
    }
    const epRegex = /-|[a-h][36]/;
    if (!epRegex.test(enPassantSquare)) {
      errors.push({
        errorType: "Invalid en passant",
        message: "The en passant you have passed is incorrect",
      });
    }
    if (isNaN(parseInt(halfMoves)) || isNaN(parseInt(fullMoves))) {
      return {
        errorType: "Move counter",
        message:
          "Invalid halfmove clock or fullmove number component in FEN string",
      };
    }
    return errors.length === 0
      ? {
          valid: true,
          boardLayoutArray,
          colorTurn,
          castlingRights,
          enPassantSquare,
          halfMoves,
          fullMoves,
        }
      : { valid: false, errors };
  }
}
console.log(validateFEN("4k2r/6r1/8/8/8/8/3R4/R3K3 w Qk - 0 1"));
function LoadUCI() {}
function DisplayLegalMoves() {}
function ShowASCII() {}
function ShowFEN() {}
function ShowBoardObject() {}
function putPieceOnSquare() {} // remove piece too
function getSquare() {}
function move() {}
function undo() {}
function moveHistory() {}
// game state stuff
function inCheck() {}
function isAttacked() {}
function isCheckmate() {}
function isDraw() {}
function isInsufficient() {}
function isThreeFold() {}
function turn() {}
/*
piecesOnBoard: {
  pawns: ['e4', ...],
  rooks: ['h1', ...],
  ...
}

 */
