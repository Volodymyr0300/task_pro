const refs = {
  openModalBtn: document.querySelector(
    '[data-action="js-open-btn-mobile-modal"]'
  ),
  closeModalBtn: document.querySelector(
    '[data-action="js-close-btn-mobile-modal"]'
  ),
  backdrop: document.querySelector(".js-backdrop"),
  header: document.querySelector(".header"),
  //   card: document.querySelector(".footer__card"),
  //   link: document.querySelector(".footer__social-link"),
};

refs.openModalBtn.addEventListener("click", onOpenModal);
refs.closeModalBtn.addEventListener("click", onCloseModal);
refs.backdrop.addEventListener("click", onBackdropClick);

function onOpenModal() {
  window.addEventListener("keydown", onEscKeyPress);
  refs.header.classList.add("show-modal");
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  refs.header.classList.remove("show-modal");
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
