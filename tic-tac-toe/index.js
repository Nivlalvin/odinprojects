const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]; 
    
    const getBoard = () => board;
  
    const updateBoard = (index, marker) => {
      if (!board[index]) {
        board[index] = marker;
        return true; 
      }
      return false; 
    };
  
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { getBoard, updateBoard, resetBoard };
  })();
  
  const Player = (name, marker) => {
    return { name, marker };
  };
  
  const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;
  
    const startGame = (player1Name, player2Name) => {
      players = [
        Player(player1Name, "X"),
        Player(player2Name, "O"),
      ];
      resetGame();
      toggleButtons(false);
    };

    const resetGame = () => {
      Gameboard.resetBoard();
      currentPlayerIndex = 0;
      gameOver = false;
      DisplayController.renderBoard();
      DisplayController.showMessage(`${players[0].name}'s turn`);
    };
  
    const playTurn = (index) => {
      if (gameOver || !Gameboard.updateBoard(index, players[currentPlayerIndex].marker)) {
        return;
      }
  
      if (checkWin()) {
        DisplayController.showMessage(`${players[currentPlayerIndex].name} wins!`);
        gameOver = true;
        endGame();
      } else if (checkTie()) {
        DisplayController.showMessage("It's a tie!");
        gameOver = true;
      } else {
        currentPlayerIndex = 1 - currentPlayerIndex; 
        DisplayController.showMessage(`${players[currentPlayerIndex].name}'s turn`);
      }
      DisplayController.renderBoard();
    };

    const endGame = () => {
        setTimeout(() => {
            toggleButtons(true);
        }, 2000);
    };
  
    const checkWin = () => {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6],           
      ];
      const board = Gameboard.getBoard();
      return winPatterns.some(pattern =>
        pattern.every(index => board[index] === players[currentPlayerIndex].marker)
      );
    };
  
    const checkTie = () => {
      return Gameboard.getBoard().every(cell => cell !== "");
    };

    const toggleButtons = (isStartVisible) => {
        const startButton = document.getElementById("start-game-btn");
        const resetButton = document.getElementById("reset-game-btn");

        if (isStartVisible) {
            startButton.style.display = "block";
            resetButton.style.display = "none";
        }else {
            startButton.style.display = "none";
            resetButton.style.display = "block";
        }
    };
  
    return { startGame, playTurn, resetGame,toggleButtons };
  })();
  
  const DisplayController = (() => {
    const renderBoard = () => {
      const gameboardDiv = document.getElementById("gameboard");
      gameboardDiv.innerHTML = ""; 
  
      Gameboard.getBoard().forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = cell;
  
        cellDiv.addEventListener("click", () => {
          Game.playTurn(index);
        });
  
        gameboardDiv.appendChild(cellDiv);
      });
    };
  
    const showMessage = (message) => {
      const messageDiv = document.getElementById("message");
      messageDiv.textContent = message;
    };
  
    return { renderBoard, showMessage };
  })();
  
  document.getElementById("start-game-btn").addEventListener("click", () => {
    const player1Name = prompt("Enter Player 1 Name:") || "Player 1";
    const player2Name = prompt("Enter Player 2 Name:") || "Player 2";
    Game.startGame(player1Name, player2Name);
  });

  document.getElementById("reset-game-btn").addEventListener("click", () => {
    Game.resetGame();
  });
  