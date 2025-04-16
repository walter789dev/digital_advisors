import type { APIRoute } from "astro";
import nodemailer from 'nodemailer';
import 'dotenv/config';

export const POST: APIRoute = async ({ request }) => {
    console.log("Content-Type recibido:", request.headers.get("content-type"));
    console.log("Método de la solicitud:", request.method);

    const data = await request.formData();

    const empresa = data.get("empresa")?.toString();
    const email = data.get("email")?.toString();
    const telefono = data.get("telefono")?.toString();
    const ubicacion = data.get("ubicacion")?.toString();
    const motivo = data.get("motivo")?.toString();

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: "Consulta de Digital Advisors",
            to: process.env.EMAIL_USER,
            subject: `Consulta de ${empresa}`,
            html: `
        <h2>Consulta Recibida</h3>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Ubicación:</strong> ${ubicacion}</p>
        <p><strong>Motivo:</strong> ${motivo}</p>
      `,
        });

        return new Response(
            JSON.stringify({ success: true, message: "Consulta enviada con éxito" }),
            { status: 200 }
        );
    } catch (err) {
        console.error("Error al enviar el correo:", err);
        return new Response(
            JSON.stringify({ success: false, message: "Error al enviar el correo" }),
            { status: 500 }
        );
    }
};
