import "dotenv/config";
import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request, redirect }) => {
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
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 20px;">
        <h2 style="color: #333333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Consulta Recibida</h2>
        <p style="color: #555555;"><strong>Empresa:</strong> ${empresa}</p>
        <p style="color: #555555;"><strong>Email:</strong> ${email}</p>
        <p style="color: #555555;"><strong>Teléfono:</strong> ${telefono}</p>
        <p style="color: #555555;"><strong>Ubicación:</strong> ${ubicacion}</p>
        <p style="color: #555555;"><strong>Motivo:</strong> ${motivo}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eeeeee;" />
        <p style="font-size: 12px; color: #999999;">Este mensaje fue generado automáticamente por el formulario de contacto de Digital Advisors.</p>
      </div>
    </div>
      `,
    });

    return redirect("/confirmation?status=success");
  } catch (err) {
    return redirect("/confirmation?status=error");
  }
};
