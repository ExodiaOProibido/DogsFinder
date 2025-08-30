import axios from "axios";

// Cria uma instância do axios já configurada
const api = axios.create({
  baseURL: "https://dog.ceo/api/breeds", // base da URL da API
  timeout: 5000, // tempo máximo de espera
});

export default api;
