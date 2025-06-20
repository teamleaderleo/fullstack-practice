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
      className="w-20 h-20 border-2 border-gray-400 text-3xl font-bold 
                 bg-white hover:bg-gray-100 transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Tic Tac Toe
        </h1>
        
        {/* Game Status */}
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-700">
            {getStatusMessage()}
          </p>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 mb-6 mx-auto w-fit">
          {Array(9).fill(null).map((_, index) => renderSquare(index))}
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg
                     hover:bg-blue-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            New Game
          </button>
        </div>

      </div>
    </div>
  );
};

export default TicTacToe;