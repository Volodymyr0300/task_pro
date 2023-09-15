import instance from "./_instance.js";
import { onBoardClick } from "./board.js";

const refs = {
  openModalBtn: document.querySelector(
    '[data-action="open-modal__create-board-btn"]'
  ),
  closeModalBtn: document.querySelector(
    '[data-action="close-modal__create-board-btn"]'
  ),
  backdrop: document.querySelector(
    ".js-main-left-sidebar__create-board-backdrop"
  ),
  input: document.querySelector(
    ".js-main-left-sidebar__create-board-modal-form-input"
  ),
  createBoardForm: document.querySelector("#create-board-form"),
  title: document.querySelector(".main-right-sidebar-content__title"),
  column: document.querySelector(
    ".main-right-sidebar-content__btn-create-column"
  ),
  text: document.querySelector(".main-right-sidebar-content__text"),
};

refs.openModalBtn?.addEventListener("click", onOpenModal);
refs.closeModalBtn?.addEventListener("click", onCloseModal);
refs.backdrop?.addEventListener("click", onBackdropClick);
refs.createBoardForm?.addEventListener("submit", createBoardForm);

function onOpenModal() {
  window.addEventListener("keydown", onEscKeyPress);
  document.body.classList.add("main-left-sidebar__board-show-modal");
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  document.body.classList.remove("main-left-sidebar__board-show-modal");
}

function onBackdropClick(event) {
  if (event.target === refs.backdrop) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.key === "Escape") {
    onCloseModal();
  }
}

function createBoardForm(e) {
  e.preventDefault();

  const name = document
    .querySelector("[name=create-name-of-board]")
    .value.trim();
  if (!name) {
    alert("Name required");
    return;
  }

  const icon = "project";

  const background = "mountain";

  const boardData = {
    name,
    icon,
    background,
  };

  const createBoardEl = (name) =>
    `<li class="item main-left-sidebar__item-item"><span class="main-left-sidebar__item-item-board-name">${name}</span></li>`;

  instance
    .post("/boards", boardData)
    .then(({ data }) => {
      console.log("Your data was ok:", data);
      const boardList = document.querySelector("#board-list");
      boardList.insertAdjacentHTML("beforeend", createBoardEl(data.name));

      const boardName = boardList.querySelector(
        ".main-left-sidebar__item-item:last-child .board-el"
      );
      console.log(boardName);

      console.log(localStorage.getItem("boards"));

      const boardsFromLocalStorageArr = JSON.parse(
        // отримую з локал стореджу до створення
        localStorage.getItem("boards")
      );
      console.log(boardsFromLocalStorageArr);

      boardsFromLocalStorageArr.push(data); // додаю борду що прийшла з бекенду

      console.log(boardsFromLocalStorageArr);

      localStorage.setItem("boards", JSON.stringify(boardsFromLocalStorageArr)); // додаю в локал сторадж

      onCloseModal();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });
}

function onSubmitCreateBoardClick() {
  refs.title.classList.add(
    "js-main-left-sidebar__create-board-modal-submit-clicked"
  );
  refs.column.classList.add(
    "js-main-left-sidebar__create-board-modal-submit-clicked"
  );
  refs.text.classList.add("js-main-right-sidebar-content__text");

  console.log(refs.input.value);
  refs.input.value = "";

  document.body.classList.remove("main-left-sidebar__board-show-modal");
}
