import nodemailer from 'nodemailer';

type EmailOptions = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export async function sendEmailInbucket({
  from,
  to,
  subject,
  html,
}: EmailOptions) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'localhost', // replace with your Inbucket server address
      port: 54325, // within docker port is 2500, but it exposed as 54325 on localhost
      secure: false, // Inbucket does not require a secure connection,

      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from,
      subject,
      html,
      to,
    });
  } catch (error) {
    // swallow error
    console.error(error);
  }
}
