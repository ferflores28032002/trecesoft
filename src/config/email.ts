import { Resend } from "resend";

const resend = new Resend("re_TuvS5hgT_H5KG3fkS4TeMGbqLhBWE38Bj");

(async function () {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["fernandojose28032002@gmail.com"],
    subject: "Hello World",
    html: "<strong>It works!</strong>",
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();
