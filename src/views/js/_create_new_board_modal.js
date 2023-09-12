import instance from "./_instance.js";

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

  instance
    .post("/boards", boardData)
    .then(({ data }) => {
      console.log("Your data was ok:", data);
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

function onInputChange(event) {
  event.currentTarget.value === ""
    ? console.log("Input is empty")
    : console.log("Input is not empty") && onSubmitCreateBoardClick();
}

refs.input?.addEventListener("input", onInputChange);
