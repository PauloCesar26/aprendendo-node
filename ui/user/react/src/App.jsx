import { useState } from 'react'
import LoandingOverlay from '@/components/ui/loandingoverlay'
import { toast, Toaster } from "sonner"
import './App.css'

function App() {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMessage] = useState("");
  const [isLoading, setIsLoanding] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      setIsLoanding(true);

      const response = await fetch("http://localhost:3001/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome, email, mensagem
        }),
      });
      
      //espera a resposta do servidor que foi enviado com res.send(...)
        //.text() converte a resposta para texto simples
      const texto = await response.text(); 
    
      toast.success(texto); //exibe a mensagem que veio do servidor
      // //limpa os dados
      setName("");
      setEmail("");
      setMessage("");
    }
    catch(erro){
      console.log("Erro: ", erro);
      toast.error("Erro ao enviar os dados.")
    }
    finally{
      setIsLoanding(false);
    }
  };

  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        {isLoading && <LoandingOverlay/>}
        <Toaster richColors />
        <div className="bg-zinc-200 w-[25%] mt-10 p-5 space-y-5 rounded-2xl">
          <h1 className="text-center">Formulario</h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col">
            <label htmlFor="">Nome:</label>  
            <input type="text" placeholder="Digite seu nome" className="border-1 border-black p-1 rounded-[5px] mb-5" value={nome} onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="">Email:</label>
            <input type="text" placeholder="Digite seu email" className="border-1 border-black p-1 rounded-[5px] mb-5" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="">Mensagem:</label>
            <input type="text" placeholder="Digite sua mensagem" className="border-1 border-black p-1 rounded-[5px] mb-5" value={mensagem} onChange={(e) => setMessage(e.target.value)}/>
            <button type="submit" className='bg-zinc-500 p-2 rounded-2xl'>Enviar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
