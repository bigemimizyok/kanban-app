import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/"
});

instance.defaults.headers.authorization = `Bearer ${localStorage.getItem("token") || ""}`;

export default instance;
