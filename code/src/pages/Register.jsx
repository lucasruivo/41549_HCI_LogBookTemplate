import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [grau, setGrau] = useState("0");
  const [apoio, setApoio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      nome,
      email,
      pass,
      grau,
      apoio: grau === "0" ? null : apoio,
    };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Registo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Palavra-passe"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        /><br />

        <label htmlFor="grau">Grau de apoio:</label><br />
        <select
          id="grau"
          value={grau}
          onChange={(e) => setGrau(e.target.value)}
          required
        >
          <option value="0">0 - Contribuidor</option>
          <option value="1">1 - Apoio leve (ex: moletas/canadianas, bengalas)</option>
          <option value="2">2 - Apoio moderado (ex: scooters de mobilidade)</option>
          <option value="3">3 - Apoio elevado (ex: andarilhos, cadeiras de rodas)</option>
        </select><br />

        {grau !== "0" && (
          <>
            <input
              type="text"
              placeholder="Tipo de objeto de apoio"
              value={apoio}
              onChange={(e) => setApoio(e.target.value)}
              required
            /><br />
          </>
        )}

        <button type="submit">Registar</button>
      </form>
    </div>
  );
}
