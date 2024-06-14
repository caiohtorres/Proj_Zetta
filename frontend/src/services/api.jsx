import axios from "axios";
const Api = axios.create({
  baseURL: "https://planejazetta.ufla.br/api",
});

export default Api;
