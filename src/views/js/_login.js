import instance from "./_instance.js";

// Отримання посилань на елементи DOM
const logForm = document.querySelector("#form-log");
const emailInput = document.querySelector(".log-section__input-email");
const passwordInput = document.querySelector(".log-section__input-password");

// Додавання обробника подій на кнопку
logForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  // Отримання значень з полів вводу
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Перевірка, чи всі поля заповнені
  if (!email || !password) {
    alert("Будь ласка, заповніть всі поля.");
    return;
  }

  // Створення об'єкта з даними для відправки на сервер
  const userData = {
    email,
    password,
  };

  instance
    .post("/users/login", userData)
    .then(({ data }) => {
      console.log("Your data was ok:", data);
      instance.defaults.headers.common = {
        Authorization: `Bearer ${data.token}`,
      };
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      window.location.replace("/main");
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });

  //   // Відправка POST-запиту на сервер
  //   fetch("http://localhost:3000/api/user/login", {
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
  //       localStorage.setItem("token", data.token);
  //       localStorage.setItem("name", data.name);
  //       window.location.replace("/main");
  //     })
  //     .catch((error) => {
  //       // Обробка помилок
  //       console.error("Помилка:", error.message);
  //       alert(error.message);
  //       // Тут ви можете додати код для обробки помилок
  //     });
});
