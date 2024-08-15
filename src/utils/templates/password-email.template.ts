export const generatePasswordRecoveryEmail = (resetUrl: string) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 30px; max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #1a73e8; font-size: 26px; text-align: center; margin-bottom: 20px; border-bottom: 2px solid #1a73e8; padding-bottom: 10px;">
      Recuperación de Contraseña
    </h1>
    <p style="font-size: 18px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
      Hola,<br />
      Hemos recibido una solicitud para restablecer tu contraseña. Para proceder, por favor, haz click en el botón de abajo:
    </p>
    <div style="text-align: center; margin-top: 30px;">
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 30px; font-size: 18px; color: #ffffff; background-color: #1a73e8; text-decoration: none; border-radius: 25px; box-shadow: 0 2px 4px rgba(26, 115, 232, 0.4);">
        Recuperar Contraseña
      </a>
    </div>
    <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
      Si no solicitaste este cambio, por favor, ignora este correo.
    </p>
  </div>
`;
