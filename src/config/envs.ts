import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  POSTGRES_USER: get("POSTGRES_USER").required().asString(),
  POSTGRES_PASSWORD: get("POSTGRES_PASSWORD").required().asString(),
  POSTGRES_HOST: get("POSTGRES_HOST").required().asString(),
  POSTGRES_PORT: get("POSTGRES_PORT").required().asPortNumber(),
  POSTGRES_DATABASE: get("POSTGRES_DATABASE").required().asString(),
  JWT: get("JWT").required().asString(),
  URL_FRONTEND: get("URL_FRONTEND").required().asString(),
  SMTP_HOST: get("SMTP_HOST").required().asString(),
  SMTP_PORT: get("SMTP_PORT").required().asPortNumber(),
  SMTP_USER: get("SMTP_USER").required().asString(),
  SMTP_PASS: get("SMTP_PASS").required().asString(),
};
