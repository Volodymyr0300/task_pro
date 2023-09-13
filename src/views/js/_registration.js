import instance from "./_instance.js";

const regForm = document.querySelector("#form-reg");
const nameInput = document.querySelector(".reg-section__input-name");
const emailInput = document.querySelector(".reg-section__input-email");
const passwordInput = document.querySelector(".reg-section__input-password");

regForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  // Отримання значень з полів вводу
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!name || !email || !password) {
    alert("Будь ласка, заповніть всі поля.");
    return;
  }

  const userData = {
    name,
    email,
    password,
  };

  instance
    .post("/users/register", userData)
    .then(({ data }) => {
      console.log("Your data was ok:", data);
      window.location.replace("/login");
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });

  //   fetch("http://localhost:3000/api/users/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Помилка при відправці запиту на сервер.");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Обробка успішної відповіді від сервера
  //       console.log("Дані успішно відправлені на сервер:", data);
  //       // Тут ви можете додати додатковий код для обробки успішної реєстрації
  //       window.location.replace("/login");
  //     })
  //     .catch((error) => {

  //       console.error("Помилка:", error.message);
  //       alert(error.message);

  //     });
});
