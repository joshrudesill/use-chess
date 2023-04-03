var whitePieces = {
  king: { x: 0, y: 0, inCheck: false, checkingPieceLocation: null },
  pawns: [],
  queens: [],
  rooks: [],
  knights: [],
  bishops: [],
};
var blackPieces = {
  king: { x: 0, y: 0, inCheck: false, checkingPieceLocation: null },
  pawns: [],
  queens: [],
  rooks: [],
  knights: [],
  bishops: [],
};
function BoardCoords(x, y) {
  this.x = x;
  this.y = y;
}
BoardCoords.prototype.getRayDepth = function (rayDepth, ignore = []) {
  //returns array with index in following order
  /*
      0 1 2
      3 P 4
      5 6 7
  
      Where y is inverted as compared to a normal graph, this is due to the nature of the 2d array
  
      o ---------x
      |  0 1 2
      |  3 P 4
      |  5 6 7
      y
  
    */
  if (rayDepth < 1) {
    console.error("Ray depth must be greater than 0");
    return;
  }
  if (ignore.length === 0) {
    return [
      { x: this.x - rayDepth, y: this.y - rayDepth },
      { x: this.x, y: this.y - rayDepth },
      { x: this.x + rayDepth, y: this.y - rayDepth },
      { x: this.x - rayDepth, y: this.y },
      { x: this.x + rayDepth, y: this.y },
      { x: this.x - rayDepth, y: this.y + rayDepth },
      { x: this.x, y: this.y + rayDepth },
      { x: this.x + rayDepth, y: this.y + rayDepth }, //7
    ];
  }
  return [
    ignore.includes(0)
      ? undefined
      : { x: this.x - rayDepth, y: this.y - rayDepth },
    ignore.includes(1) ? undefined : { x: this.x, y: this.y - rayDepth },
    ignore.includes(2)
      ? undefined
      : { x: this.x + rayDepth, y: this.y - rayDepth },
    ignore.includes(3) ? undefined : { x: this.x - rayDepth, y: this.y },
    ignore.includes(4) ? undefined : { x: this.x + rayDepth, y: this.y },
    ignore.includes(5)
      ? undefined
      : { x: this.x - rayDepth, y: this.y + rayDepth },
    ignore.includes(6) ? undefined : { x: this.x, y: this.y + rayDepth },
    ignore.includes(7)
      ? undefined
      : { x: this.x + rayDepth, y: this.y + rayDepth }, //7
  ];
};
BoardCoords.prototype.getRayDepthDiag = function (rayDepth) {
  //returns array with index in following order
  /*
      0 1 2
      3 P 4
      5 6 7
  
      Where y is inverted as compared to a normal graph, this is due to the nature of the 2d array
  
      o ---------x
      |  0 1 2
      |  3 P 4
      |  5 6 7
      y
  
    */
  if (rayDepth < 1) {
    console.error("Ray depth must be greater than 0");
    return;
  }
  return [
    { x: this.x - rayDepth, y: this.y - rayDepth },
    { x: this.x + rayDepth, y: this.y - rayDepth },
    { x: this.x - rayDepth, y: this.y + rayDepth },
    { x: this.x + rayDepth, y: this.y + rayDepth }, //7
  ];
};
BoardCoords.prototype.getSingleRayDepth = function (rayDepth, direction) {
  if (rayDepth < 1) {
    console.error("Ray depth must be greater than 0");
    return;
  }
  if (direction === 0) return { x: this.x - rayDepth, y: this.y - rayDepth };
  if (direction === 1) return { x: this.x, y: this.y - rayDepth };
  if (direction === 2) return { x: this.x + rayDepth, y: this.y - rayDepth };
  if (direction === 3) return { x: this.x - rayDepth, y: this.y };
  if (direction === 4) return { x: this.x + rayDepth, y: this.y };
  if (direction === 5) return { x: this.x - rayDepth, y: this.y + rayDepth };
  if (direction === 6) return { x: this.x, y: this.y + rayDepth };
  if (direction === 7) return { x: this.x + rayDepth, y: this.y + rayDepth };
};
BoardCoords.prototype.getRayDepthFile = function (rayDepth) {
  //returns array with index in following order
  /*
      0 1 2
      3 P 4
      5 6 7
  
      Where y is inverted as compared to a normal graph, this is due to the nature of the 2d array
  
      o ---------x
      |  0 1 2
      |  3 P 4
      |  5 6 7
      y
  
    */
  if (rayDepth < 1) {
    console.error("Ray depth must be greater than 0");
    return;
  }
  return [
    { x: this.x, y: this.y - rayDepth },
    { x: this.x - rayDepth, y: this.y },
    { x: this.x + rayDepth, y: this.y },
    { x: this.x, y: this.y + rayDepth }, //6
  ];
};
const UPPER_LEFT = 0;
const UPPER = 1;
const UPPER_RIGHT = 2;
const LEFT = 3;
const RIGHT = 4;
const LOWER_LEFT = 5;
const LOWER = 7;
const LOWER_RIGHT = 7;
const PAWN = "p";
const ROOK = "r";
const QUEEN = "q";
const KNIGHT = "n";
const KING = "k";
const BISHOP = "b";
const files = "abcdefgh";
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
let NonUCIBoard = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];
function Chess() {
  let p = [
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
function LoadFEN(fen) {
  const validation = validateFEN(fen);
  if (validation.valid) {
    if (parseFENIntoMemory(validation.boardLayout)) {
      // calculate moves
    }
  }
}
function parseFENIntoMemory(fen) {
  const boardRows = fen.split("/");
  for (let i = 0; i < 8; i++) {
    var rowIndex = 0;
    const derivedRow = boardRows[i].split("").flatMap((square) => {
      // create object with pawn[], queen[], etc
      if (isNaN(Number(square))) {
        rowIndex += 1;
        if (square === "P") {
          whitePieces.pawns.push({ x: rowIndex - 1, y: i });
        }
        if (square === "K") {
          whitePieces.king = {
            x: rowIndex - 1,
            y: i,
            inCheck: false,
            checkingPieceLocation: null,
          };
        }
        return {
          hasMoved: false,
          stringType: square.toLowerCase(),
          numericType: parseInt(square),
          color: square.toUpperCase() === square ? "w" : "b",
          moveHistory: [],
          legalMoves: [],
          position: {
            x: rowIndex - 1,
            y: i,
            UCI: UCIBoard[i][rowIndex - 1],
          },
        };
      } else {
        rowIndex += Number(square);
        return new Array(Number(square)).fill(null);
      }
    });
    if (derivedRow.length === 8) {
      NonUCIBoard[i] = derivedRow;
    } else {
      //error, need to break here
      console.error("problem with fen string");
      return false;
    }
  }
  return true;
}
function createPieceCalculationRoutine(turn) {
  const { pawns, queens, rooks, bishops, knights, king } =
    turn === "w" ? whitePieces : blackPieces;
  //to return {incheck, checkLocation}
  calculateKingSpecialties(king, turn);
  //calculatePawns(pawns, turn);
  /*
    calculateQueen(queens);
    calculateRook(rooks);
    calculateBishop(bishops);
    calculateKnight(knights);
    calculateKing(king);
     */
}
// this function is meant for pinning pieces and determining if the king is in check, if the king is in check need to do special calc for finding moves that block the check, king moves need to follow.
function calculateKingSpecialties(king, turn) {
  //shoot rays for incheck
  //shoot rays for pinning
  //probably build special one for king - done
  //to return {incheck, checking location, pinnedpieces: [pindirection, location(x,y)] }
  console.log(detectPieces(king, turn));
}
function detectPieces(king, turn, singleDirection = null) {
  //input piece location then find first hits and return array with piece hit locations
  const pieceLocation = new BoardCoords(king.x, king.y);
  var foundPieces = [];
  var inCheck = false;
  var checkingPiece = {};
  var pinnedPieces = [];
  var ignore = [];
  for (let i = 0; i < 8; i++) {
    const rd = pieceLocation.getRayDepth(i + 1, ignore);
    for (let j = 0; j < rd.length; j++) {
      if (rd[j] !== undefined) {
        const access = accessBoard(rd[j].x, rd[j].y);
        if (access === false) break;
        if (access !== null) {
          //if piece is enemy and direction matches - incheck, add to ignore
          if (access.color !== turn) {
            if (
              j === UPPER_LEFT ||
              j === UPPER_RIGHT ||
              j === LOWER_LEFT ||
              j === LOWER_RIGHT
            ) {
              if (access.stringType === BISHOP || access.stringType === QUEEN) {
                // attacking king, king in check
                ignore.push(j);
                inCheck = true;
                checkingPiece = { x: access.position.x, y: access.position.y };
              }
            } else if (
              j === LOWER ||
              j === UPPER ||
              j === LEFT ||
              j === RIGHT
            ) {
              if (access.stringType === ROOK || access.stringType === QUEEN) {
                // attacking king, king in check
                ignore.push(j);
                inCheck = true;
                checkingPiece = { x: access.position.x, y: access.position.y };
              }
            }
          } else {
            //if piece is friendly - check further in that direction for attacking piece - then pin or not
            const friendlyPiece = new BoardCoords(
              access.position.x,
              access.position.y
            );
            for (let c = 0; c < 8; c++) {
              //
              const pieceAccess = accessBoard(
                friendlyPiece.getSingleRayDepth(c + 1, j).x,
                friendlyPiece.getSingleRayDepth(c + 1, j).y
              );
              if (pieceAccess === false) break;
              if (pieceAccess === null) continue;
              if (pieceAccess !== null) {
                //
                if (pieceAccess.color !== turn) {
                  //enemy piece found, lets check its attacking direction
                  if (
                    j === UPPER_LEFT ||
                    j === UPPER_RIGHT ||
                    j === LOWER_LEFT ||
                    j === LOWER_RIGHT
                  ) {
                    //
                    if (
                      pieceAccess.stringType === BISHOP ||
                      pieceAccess.stringType === QUEEN
                    ) {
                      // attacking piece, piece is now pinned
                      ignore.push(j);
                      pinnedPieces.push({
                        x: friendlyPiece.x,
                        y: friendlyPiece.y,
                        pinDirection: j,
                      });
                      break;
                    }
                  } else if (
                    j === LOWER ||
                    j === UPPER ||
                    j === LEFT ||
                    j === RIGHT
                  ) {
                    //
                    if (
                      pieceAccess.stringType === ROOK ||
                      pieceAccess.stringType === QUEEN
                    ) {
                      // attacking piece, piece is now pinned
                      ignore.push(j);
                      pinnedPieces.push({
                        x: friendlyPiece.x,
                        y: friendlyPiece.y,
                        pinDirection: j,
                      });
                      break;
                    }
                  }
                }
                break;
              }
            }
          }
          //else nothing
        }
      }
    }
  }
  //to return {incheck, checking location, pinnedpieces: [pindirection, location(x,y)] }
  return { inCheck, checkingPiece, pinnedPieces };
}
function shootRays(diagonals, files, px, py) {
  //input piece location then find first hits and return array with piece hit locations
  const pieceLocation = new BoardCoords(px, py);
  for (let i = 0; i < 8; i++) {
    pieceLocation.getRayDepth(i + 1);
  }
  return [{}];
}
LoadFEN("8/3q4/8/8/3K4/8/8/8 w - - 0 1");
createPieceCalculationRoutine("w");
function calculatePawns(pieces, turn) {
  const pawnDirection = turn === "w" ? -1 : 1;
  for (const pawn of pieces) {
    const { x, y } = pawn;
    //basic first moves
    const boardPiece = accessBoard(x, y);
    if (boardPiece !== false && boardPiece !== null) {
      if (boardPiece.moveHistory.length === 0) {
        boardPiece.legalMoves.push(
          {
            x: x,
            y: pawnDirection === -1 ? 2 : 5,
            UCI: `${files[x]}${pawnDirection === -1 ? 3 : 6}`,
          },
          {
            x: x,
            y: pawnDirection === -1 ? 3 : 4,
            UCI: `${files[x]}${pawnDirection === -1 ? 4 : 5}`,
          }
        );
      } else {
        const boardPiecePos = accessBoard(x + 1, y + pawnDirection);
        if (
          boardPiecePos !== false &&
          boardPiecePos !== null &&
          boardPiecePos.color !==
            (boardPiece === null || boardPiece === void 0
              ? void 0
              : boardPiece.color)
        ) {
          addLegalMoves(x, y, [
            {
              x: x + 1,
              y: y + pawnDirection,
              UCI: `${files[x]}${pawnDirection === -1 ? 3 : 6}`,
            },
          ]);
        }
        if (accessBoard(x - 1, y + pawnDirection) !== null) {
          addLegalMoves(x, y, [
            {
              x: x - 1,
              y: y + pawnDirection,
              UCI: `${files[x]}${pawnDirection === -1 ? 3 : 6}`,
            },
          ]);
        }
      }
    }
  }
}
//take xy and return moves, since this logic is reused anyway
function calculateDiagonals(x, y) {}
function calculateFiles(x, y) {}
function calculateQueen(pieces) {}
function calculateRook(pieces) {}
function calculateBishop(pieces) {}
function calculateKnight(pieces) {}
function calculateKing(pieces) {}
function accessBoard(x, y) {
  if (x < 8 && y < 8 && x >= 0 && y >= 0) return NonUCIBoard[y][x];
  return false;
}
function addLegalMoves(x, y, moves) {
  if (x < 8 && y < 8) return false;
  const preMoves = NonUCIBoard[x][y];
  if (preMoves !== null) {
    preMoves.legalMoves = preMoves.legalMoves.concat(moves);
    return true;
  }
  return false;
}
//Internal
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
