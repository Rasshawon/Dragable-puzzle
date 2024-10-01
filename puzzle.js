const puzzleContainer = document.getElementById("puzzle");
const shuffleButton = document.getElementById("shuffleButton");
const imageUrl = "./asset/0de4d7eacb83e212720f62e0afa74d6d.jpg"; // Replace with your image URL
let tiles = [];
let isSolved = false; // Flag to check if the puzzle is solved

// Initialize tiles
function initTiles() {
  for (let i = 0; i < 9; i++) {
    tiles.push(i);
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.draggable = true;
    tile.style.width = "100px";
    tile.style.height = "100px";
    tile.style.backgroundImage = `url(${imageUrl})`;
    tile.style.backgroundSize = "300px 300px";
    tile.style.backgroundPosition = `${-(i % 3) * 100}px ${-(
      Math.floor(i / 3) * 100
    )}px`;
    tile.dataset.index = i;
    tile.addEventListener("dragstart", dragStart);
    puzzleContainer.appendChild(tile);
  }
  shuffleTiles();
}

// Handle drag start
function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

// Handle drag over
function dragOver(event) {
  event.preventDefault();
}

// Handle drop
function drop(event) {
  const draggedIndex = event.dataTransfer.getData("text/plain");
  const targetIndex = event.target.dataset.index;

  if (isAdjacent(draggedIndex, targetIndex)) {
    swapTiles(draggedIndex, targetIndex);
  }
}

// Check if two tiles are adjacent
function isAdjacent(index1, index2) {
  const row1 = Math.floor(index1 / 3);
  const col1 = index1 % 3;
  const row2 = Math.floor(index2 / 3);
  const col2 = index2 % 3;
  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

// Swap tiles
function swapTiles(index1, index2) {
  const tile1 = puzzleContainer.children[index1];
  const tile2 = puzzleContainer.children[index2];

  // Swap background positions
  const tempPosition = tile1.style.backgroundPosition;
  tile1.style.backgroundPosition = tile2.style.backgroundPosition;
  tile2.style.backgroundPosition = tempPosition;

  // Swap indices in the tiles array
  [tiles[index1], tiles[index2]] = [tiles[index2], tiles[index1]];

  // Check if the puzzle is completed
  checkPuzzleCompleted();
}

// Check if the puzzle is solved
function checkPuzzleCompleted() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] !== i) {
      return false; // If any tile is out of place, the puzzle is not complete
    }
  }
  if (!isSolved) {
    setTimeout(() => {
      alert("Puzzle completed successfully!");
    }, 1000); // Alert only when it's the first completion
    isSolved = true; // Set the flag to prevent multiple alerts
  }
  return true;
}

// Shuffle tiles
function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    swapTiles(i, j);
  }
}

// Attach event listeners to the tiles
function attachTileEvents() {
  for (const tile of puzzleContainer.children) {
    tile.addEventListener("dragover", dragOver);
    tile.addEventListener("drop", drop);
  }
}

// Shuffle button event listener
shuffleButton.addEventListener("click", () => {
  isSolved = false; // Reset the solved flag when shuffling
  shuffleTiles();
});

// Initialize the puzzle
initTiles();
attachTileEvents();

//mobile
// Handle touch start (initiate drag)
function handleTouchStart(event) {
  event.preventDefault();
  const draggedIndex = event.target.dataset.index;
  // Show custom cursor (optional)
  // ...

  const onTouchMove = (moveEvent) => {
    moveEvent.preventDefault();
    // Handle dragging logic here
    // ...
  };
  const onTouchEnd = () => {
    // Handle dropping logic here
    // ...
    // Hide custom cursor (optional)
    // ...
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  };

  document.addEventListener("touchmove", onTouchMove);
  document.addEventListener("touchend", onTouchEnd);
}
