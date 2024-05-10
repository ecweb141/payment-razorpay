import nodeMailer from "nodemailer";

export interface SendMailOption {
  to: string;
  from: string;
  description?: string;
  subject?: string;
  link: string;
  lastName: string;
  where?: boolean;
}
export const SendMail = async ({
  to,
  from,
  description,
  subject,
  lastName,
  link,
  where,
}: SendMailOption) => {
  const { SMTP_KEY, SMTP_MAIL } = process.env;
  const transPort = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_KEY,
    },
  });

  const ResetPassword = [];
  const ConfirmAccount = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
    <tr>
      <td style="padding: 20px;">
        <h2 style="color: #333333;">Welcome to Our Platform!</h2>
        <p style="color: #666666;">Dear ${lastName},</p>
        <p style="color: #666666;">Thank you for joining us. We're excited to have you on board!</p>
        <p style="color: #666666;">Please activate your account to get started:</p>
        <table style="margin: 20px auto;">
          <tr>
            <td align="center" bgcolor="#007bff" style="border-radius: 5px;">
              <a href={${link}} target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; text-decoration: none;">Activate Account</a>
            </td>
          </tr>
        </table>
        <p style="color: #666666;">If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
        <p style="color: #666666;"><a href="${link}" style="color: #007bff; text-decoration: underline;">[ActivationLink]</a></p>
        <p style="color: #666666;">If you have any questions or need assistance, feel free to contact us at [cgavit141@gmail.com].</p>
        <p style="color: #666666;">Best regards,<br>['authProvider']</p>
        <!-- Social media icons -->
        <table style="margin-top: 20px;">
          <tr>
            <td style="padding-right: 10px;">
              <a href="[FacebookLink]" target="_blank"><img src="facebook-icon.png" alt="Facebook" style="width: 30px; height: 30px;"></a>
            </td>
            <td style="padding-right: 10px;">
              <a href="[TwitterLink]" target="_blank"><img src="" alt="Twitter" style="width: 30px; height: 30px;"></a>
            </td>
            <td style="padding-right: 10px;">
              <a href="[LinkedInLink]" target="_blank"><img src="" alt="LinkedIn" style="width: 30px; height: 30px;"></a>
            </td>
            <!-- Add more social media icons as needed -->
          </tr>
        </table>
        <!-- Website link -->
        <p style="color: #666666; margin-top: 20px;">Visit our website: <a href="[WebsiteLink]" style="color: #007bff; text-decoration: underline;">[WebsiteLink]</a></p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
  try {
    const sendResult = await transPort.sendMail({
      from: SMTP_MAIL,
      to,
      subject: "this email is for activate you account",
      html: ConfirmAccount,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error, "this is error generated where email send in backend");
  }
};
