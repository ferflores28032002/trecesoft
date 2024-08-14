import fs from "fs";

import nodemailer, { Transporter } from "nodemailer";

import { envs } from "../config";

interface IEmailOptions {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

interface IEmailResult {
  accepted: string[];
  rejected: string[];
}

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.SMTP_HOST,
      port: envs.SMTP_PORT,
      auth: {
        user: envs.SMTP_USER,
        pass: envs.SMTP_PASS,
      },
    });
  }

  public async sendEmail(options: IEmailOptions): Promise<IEmailResult | null> {
    try {
      const result = await this.transporter.sendMail({
        from: options.from,
        to: options.to.join(", "),
        subject: options.subject,
        html: options.html,
      });

      if (result.rejected.length > 0) {
        return null;
      }

      return {
        accepted: result.accepted as string[],
        rejected: result.rejected as string[],
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // Método para cargar una plantilla HTML desde un archivo
  public static loadTemplate(templatePath: string): string {
    return fs.readFileSync(templatePath, "utf8");
  }
}

export default EmailService;
