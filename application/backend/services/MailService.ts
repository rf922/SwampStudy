import { emailTemplates } from "../utils/emailTemplates";
/**
 * mail service handles sending automated emails to main swampstudy mail address
 */
export class MailService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const template = emailTemplates["permissionsChange"];
    const text = template.text;
    await this.sendEmail(to, template.subject, text);
  }

  /**
   * method for sending recovery email with recovery link
   * @param to
   * @param link
   */
  public async sendRecoveryEmail(to: string, link: string) {
    const template = emailTemplates["passwordRecovery"];
    const text = template.text(link);
    await this.sendEmail(to, template.subject, text);
  }
}
