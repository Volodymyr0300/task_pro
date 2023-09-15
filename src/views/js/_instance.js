const instance = axios.create({ baseURL: "http://localhost:3000/api" });
const token = localStorage.getItem("token");
if (token) {
  instance.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
  instance
    .get("/users/current")
    .then(({ data }) => {
      localStorage.setItem("name", data.name);
      localStorage.setItem("boards", JSON.stringify(data.boards));
      console.log(data.boards);

      if (window.location.pathname !== "/main") {
        window.location.replace("/main");
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("boards");
      instance.defaults.headers.common = {
        Authorization: "",
      };
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    });
} else {
  if (window.location.pathname === "/main") {
    window.location.replace("/login");
  }
}
export default instance;
