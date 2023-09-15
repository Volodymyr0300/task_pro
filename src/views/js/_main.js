import { onBoardClick } from "./board.js";

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

if (window.location.pathname === "/main") {
  const boards = JSON.parse(localStorage.getItem("boards"));
  console.log(boards);

  if (boards.length) {
    const boardList = document.querySelector("#board-list");
    const boardsEl = boards
      .map(
        ({ name }) =>
          `<li class="item main-left-sidebar__item-item"><span class="main-left-sidebar__item-item-board-name board-el">${name}</span></li>`
      )
      .join("");

    boardList.insertAdjacentHTML("afterbegin", boardsEl);

    const boardEl = document.querySelectorAll(".board-el");

    console.log(boardEl);
    boardEl.forEach((elem) => {
      elem.addEventListener("click", onBoardClick);
    });
  }
}
