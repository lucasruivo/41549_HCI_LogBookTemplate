import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [erro, setErro] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
  
    // Validações
    if (!nome || !email || !pass) {
      setErro("Preenche todos os campos!");
      return;
    }
    if (!email.includes('@')) {
      setErro("Email inválido!");
      return;
    }
    if (pass.length < 6) {
      setErro("A password deve ter pelo menos 6 caracteres.");
      return;
    }
  
    // Guardar no localStorage
    const user = {
      nome,
      email,
      pass,
    };
    localStorage.setItem("user", JSON.stringify(user));
  
    setErro('');
    navigate('/map');
  };
  

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Registo</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        /><br />

        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
}

