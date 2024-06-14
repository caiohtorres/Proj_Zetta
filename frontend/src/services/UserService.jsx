import Api from "./api";

export default class UserService {
  async login(dados) {
    try {
      const response = await Api.post("/login", dados);
      localStorage.setItem("nome", response.data.user.nome);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("token", response.data.user.token);
      return response.data;
    } catch (error) {
      console.error("Erro durante o login:", error);
      return { error: "Erro durante o login" };
    }
  }

  async cadastrar(dados) {
    try {
      const response = await Api.post("/cadastrousuario", dados);
      return response.data;
    } catch (error) {
      console.error("Erro durante o cadastro do usuário:", error);
      throw error;
    }
  }

  usuarioAutenticado() {
    return localStorage.getItem("token") !== null;
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    sessionStorage.clear();
  }
}
