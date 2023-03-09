function Chess() {
  var b = [
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
  const errors = [];

  const regex =
    /^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+ [wb-] ([kqKQ]{1,4}|-) ([a-h][1-8]|\-) (\d+) (\d+)$/;
  const match = regex.exec(fen);
  console.log(match);
  if (!match) {
    errors.push({ type: "format", message: "Invalid FEN string format." });
  } else {
    const ranks = match[1].split("/");
    if (ranks.length !== 8) {
      errors.push({ type: "ranks", message: "Invalid number of ranks." });
    } else {
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
        if (rank.length !== 8) {
          errors.push({
            type: "squares",
            message: "Invalid number of squares in rank.",
          });
        } else {
          let file = 0;
          for (let j = 0; j < rank.length; j++) {
            const char = rank.charAt(j);
            if (char >= "1" && char <= "8") {
              file += parseInt(char);
            } else if (validPieces.includes(char)) {
              file++;
            } else {
              errors.push({
                type: "pieces",
                message: "Invalid piece or rank.",
              });
            }
          }
          if (file !== 8) {
            errors.push({ type: "files", message: "Invalid number of files." });
          }
        }
      }

      const activeColor = match[2];
      if (activeColor !== "w" && activeColor !== "b") {
        errors.push({ type: "color", message: "Invalid active color." });
      }

      const castling = match[3];
      const validCastling = /^(-|[KQkq]+)$/;
      if (!validCastling.test(castling)) {
        errors.push({ type: "castling", message: "Invalid castling rights." });
      }

      const enPassant = match[4];
      if (
        enPassant !== "-" &&
        (!/^[a-h][36]$/.test(enPassant) ||
          (activeColor === "w" && enPassant.charAt(1) !== "6") ||
          (activeColor === "b" && enPassant.charAt(1) !== "3"))
      ) {
        errors.push({
          type: "enPassant",
          message: "Invalid en passant target square.",
        });
      }

      const halfMoveClock = parseInt(match[5]);
      if (isNaN(halfMoveClock) || halfMoveClock < 0) {
        errors.push({
          type: "halfMoveClock",
          message: "Invalid half move clock.",
        });
      }

      const fullMoveNumber = parseInt(match[6]);
      if (isNaN(fullMoveNumber) || fullMoveNumber < 1) {
        errors.push({
          type: "fullMoveNumber",
          message: "Invalid full move number.",
        });
      }
    }
  }

  return errors.length ? errors : true;
}

console.log(
  validateFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
);
const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const boardRows = fen.split(/\/(?=[^/])/g).map((row) => {
  return row.split("").map((square) => {
    return isNaN(square) ? square : new Array(parseInt(square)).fill("");
  });
});
console.log(boardRows);
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
