import { useState } from "react";
import "./index.scss";

//render board
//move
//winning conditions
//extras -->mark winner and reset board ,show current player

export const TicTacToe = ({ size = 4 }) => {
  const [player, setPlayer] = useState("X");
  const [isActive, setIsActive] = useState(true);
  const [winner, setWinner] = useState("");
  const [rows, setRows] = useState(new Array(size).fill(0));
  const [cols, setCols] = useState(new Array(size).fill(0));
  const [diag, setDiag] = useState(0);
  const [antiDiag, setAntidiag] = useState(0);

  const endGame = () => {
    setIsActive(false);
    setWinner(player);
  };
  const checkWinner = (index) => {
    const value = player === "X" ? 1 : -1;
    const row = Math.floor(index / size);
    const col = index % size;
    const clonedRows = [...rows];
    clonedRows[row] += value;
    const clonedCols = [...cols];
    clonedCols[col] += value;
    let newDiagSum = diag;
    let newAntiDiagSum = antiDiag;

    if (row === col) {
      newDiagSum += 1;
    }
    if (row + col === size - 1) {
      newAntiDiagSum += 1;
    }
    if (
      Math.abs(clonedRows[row]) === size ||
      Math.abs(clonedCols[col]) === size ||
      Math.abs(newDiagSum) === size ||
      Math.abs(newAntiDiagSum) === size
    ) {
      endGame();
      return;
    }
    setCols(clonedCols);
    setRows(clonedRows);
    setDiag(newDiagSum);
    setAntidiag(newAntiDiagSum);
  };

  const move = (event) => {
    if (event.target.textContent || !isActive) return;
    event.target.textContent = player;
    setPlayer(player === "X" ? "O" : "X");
    checkWinner(Number(event.target.dataset.cellIndex));
  };

  const reset = () => {
    setIsActive(true);
    setCols(new Array(size).fill(0));
    setRows(new Array(size).fill(0));
    setDiag(0);
    setAntidiag(0);
  };

  return (
    <div className="container">
      {winner && `${winner} won the game`}
      <section
        className={`tic-container ${!isActive ? "inactive" : ""}`}
        style={{
          gridTemplateColumns: `repeat(${size}, 100px)`,
          gridTemplateRows: `repeat(${size}, 100px)`,
        }}
      >
        {new Array(size * size).fill().map((_, index) => (
          <div
            onClick={move}
            key={index}
            className="cell"
            data-cell-index={index}
          ></div>
        ))}
      </section>
      <button onClick={reset}>Reset Game</button>
    </div>
  );
};
