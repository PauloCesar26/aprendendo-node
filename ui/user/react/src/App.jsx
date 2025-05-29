import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch("http://localhost:3001/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome, email, mensagem
        }),
      });

      if(!response.ok){
        throw new Error("Erro ao enviar os dados");
      }

      //espera a resposta do servidor que foi enviado com res.send(...)
        //.text() converte a resposta para texto simples
      const texto = await response.text(); 
      window.alert(texto); //exibe a mensagem que veio do servidor
      //limpa os dados
      setName("");
      setEmail("");
      setMessage("");
    }
    catch(erro){
      console.log("Erro: ", erro);
      window.alert("Erro ao eniar os dados.")
    }
  };

  return (
    <>
      <div className="">
        <h1>Formulario</h1>
        <form onSubmit={handleSubmit} className="w-60 flex flex-col gap-6">  
          <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setName(e.target.value)}/>
          <input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="text" placeholder="Digite sua mensagem" value={mensagem} onChange={(e) => setMessage(e.target.value)}/>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  )
}

export default App
