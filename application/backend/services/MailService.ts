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
}
