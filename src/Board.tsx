import { useState } from "react";

type BoardCell = "X" | "O" | "";

interface GameState {
  winner: BoardCell | "C";
  board: BoardCell[][];
  player: "X" | "O";
}

function initialGameState(): GameState {
  return {
    winner: "",
    player: "X",
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };
}

export default function Board() {
  const [gameState, setGameState] = useState<GameState>(initialGameState());

  function makeMove(x: number, y: number) {
    if (gameState.winner === "") {
      const board = [...gameState.board];
      board[x][y] = gameState.player;
      setGameState({
        player: gameState.player === "X" ? "O" : "X",
        winner: checkWin(board),
        board,
      });
    }
  }

  function checkWin(board: GameState["board"]): BoardCell | "C" {
    // check diagonal
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }

    // check horizontal
    for (let row of board) {
      if (row[0] === row[1] && row[1] === row[2]) {
        return row[0];
      }
    }

    // check vertical
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
      }
    }

    // check cat
    if (!board.flat().includes("")) {
      return "C";
    }

    return "";
  }

  return (
    <>
      <table>
        <tbody>
          {gameState.board.map((row, xIndex) => {
            return (
              <tr>
                {row.map((owner, yIndex) => (
                  <td onClick={() => makeMove(xIndex, yIndex)}>{owner}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        {gameState.winner === ""
          ? `${gameState.player}'s turn`
          : `${gameState.winner} wins!`}
      </p>
      <button onClick={() => setGameState(initialGameState())}>Reset</button>
    </>
  );
}
