import React, { useState } from "react";
import Board from "./components/Board";
import Modal from "react-modal";
import "./TicTacToe.css";

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (index) => {
    if (winner || board[index]) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      setIsModalOpen(true);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square)
    ? "It's a draw!"
    : `Next player: ${isXNext ? "X" : "O"}`;
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  return (
    <div>
      <div className="status">{status}</div>
      <Board squares={board} onClick={handleClick} />
      <button className="reset-button" onClick={handleRestart}>
        Restart Game
      </button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div>
          <h2>{`Winner: ${winner}`}</h2>
          <button onClick={handleRestart}>Restart Game</button>
        </div>
      </Modal>
    </div>
  );
};

export default TicTacToe;
