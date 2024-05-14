import { permissionsChange } from "./../utils/emailTemplates";
/**
 * mail service handles sending automated emails to main swampstudy mail address
 */
export class MailService {
  constructor(private mailTransporter: any) {
    this.mailTransporter = mailTransporter;
  }

  /**
   * sends an email
   * @param to
   * @param subject
   * @param text
   * @param html
   */
  public async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ) {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to,
      subject,
      text,
      html,
    };

    try {
      await this.mailTransporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  /**
   * method for sending account permission type verification email.
   * @param to
   */
  public async sendPermissionsChangeEmail(to: string) {
    const { subject, text } = permissionsChange;
    await this.sendEmail(to, subject, text);
  }
}
