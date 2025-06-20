import { useState } from 'react';

const TicTacToe = () => {
  // Initialize game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Win condition patterns (indices for 3x3 grid)
  const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  // Check for winner
  const checkWinner = (currentBoard) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  // Handle square click
  const handleClick = (index) => {
    // Ignore click if game is over or square is already filled
    if (winner || board[index]) return;

    // Create new board with the move
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    
    // Update state
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    // Check for winner after move
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  // Check if board is full (tie game)
  const isBoardFull = board.every(square => square !== null);

  // Render individual square
  const renderSquare = (index) => (
    <button
      key={index}
      className="square"
      onClick={() => handleClick(index)}
      disabled={winner || board[index]}
    >
      {board[index]}
    </button>
  );

  // Game status message
  const getStatusMessage = () => {
    if (winner) {
      return `🎉 Player ${winner} wins!`;
    } else if (isBoardFull) {
      return "🤝 It's a tie!";
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <h1 className="game-title">Tic Tac Toe</h1>
        
        {/* Game Status */}
        <div className="status-container">
          <p className="status-text">{getStatusMessage()}</p>
        </div>

        {/* Game Board */}
        <div className="board">
          {Array(9).fill(null).map((_, index) => renderSquare(index))}
        </div>

        {/* Reset Button */}
        <div className="button-container">
          <button onClick={resetGame} className="reset-button">
            New Game
          </button>
        </div>

        {/* Game Rules */}
        <div className="rules">
          <h3>How to Play:</h3>
          <ul>
            <li>• Players take turns placing X's and O's</li>
            <li>• First to get 3 in a row (horizontal, vertical, or diagonal) wins</li>
            <li>• If all squares are filled with no winner, it's a tie</li>
          </ul>
        </div>
      </div>
      
      <style jsx>{`
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f3f4f6;
          padding: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .game-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          max-width: 400px;
          width: 100%;
        }

        .game-title {
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 1.5rem;
          color: #374151;
        }

        .status-container {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .status-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: #4b5563;
          margin: 0;
        }

        .board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin: 0 auto 1.5rem;
          width: fit-content;
        }

        .square {
          width: 80px;
          height: 80px;
          border: 2px solid #9ca3af;
          font-size: 2rem;
          font-weight: bold;
          background: white;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .square:hover:not(:disabled) {
          background-color: #f9fafb;
        }

        .square:disabled {
          cursor: not-allowed;
        }

        .button-container {
          text-align: center;
        }

        .reset-button {
          padding: 12px 24px;
          background-color: #3b82f6;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
          font-size: 1rem;
        }

        .reset-button:hover {
          background-color: #2563eb;
        }

        .rules {
          margin-top: 2rem;
          font-size: 0.875rem;
          color: #6b7280;
          max-width: 320px;
        }

        .rules h3 {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .rules ul {
          margin: 0;
          padding-left: 0;
          list-style: none;
        }

        .rules li {
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default TicTacToe;