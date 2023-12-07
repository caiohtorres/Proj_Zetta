const validarEmail = (email) => {
  return email?.toString().includes("@") && email?.toString().includes(".");
};

const validarSenha = (senha) => {
  return senha?.toString().length > 6;
};

const validarNome = (nome) => {
  return nome?.toString().length > 2;
};

const validarConfirmarSenha = (senha, confirmarSenha) => {
  return validarSenha(senha) && senha === confirmarSenha;
};

const validarConfirmarEmail = (email, confirmarEmail) => {
  return validarEmail(email) && email === confirmarEmail;
};

export {
  validarConfirmarEmail,
  validarConfirmarSenha,
  validarEmail,
  validarNome,
  validarSenha,
};
