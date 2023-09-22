import axios from "axios";

console.log(localStorage.getItem("Token"), "token");

export const BASE_url = "http://localhost:5000";

export const requestInstance = axios.create({
  headers: {
    "x-api-key": `${localStorage.getItem("Token")}`,
  },
});
