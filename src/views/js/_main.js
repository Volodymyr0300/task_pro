const userName = document.querySelector("#user-name");
const boardNameInput = document.querySelector("[name=create-name-of-board]");

const name = localStorage.getItem("name");

if (userName) {
  userName.textContent = name;
}

const createBoardForm = document.querySelector("#create-board-form");

createBoardForm?.addEventListener("submit", createBoard);

function createBoard(e) {
  e.preventDefault();

  const boardName = boardNameInput.value;
  if (!boardName) {
    return alert("This input couldn't be empty!");
  }
}
