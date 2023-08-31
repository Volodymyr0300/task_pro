document
  .querySelector(".header-theme__btn")
  .addEventListener("click", function () {
    var menu = document.querySelector(".header-theme__dropdown-menu");
    var arrow = document.querySelector(".header-theme__mobile-icon-open");
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
      arrow.style.transform = "rotate(180deg)";
    } else {
      menu.style.display = "none";
      arrow.style.transform = "rotate(0deg)";
    }
  });
