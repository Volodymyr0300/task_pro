import instance from "./_instance.js";

const logForm = document.querySelector("#form-log");
const emailInput = document.querySelector(".log-section__input-email");
const passwordInput = document.querySelector(".log-section__input-password");

logForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Будь ласка, заповніть всі поля.");
    return;
  }

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
      localStorage.setItem("boards", JSON.stringify(data.boards));
      window.location.replace("/main");
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });
});
