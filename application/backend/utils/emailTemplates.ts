/**
 * util file for managing email templates sent to users,
 * subject : should convey the subject of the email, i.e Password recover, account type change
 * text    : the txt body itself
 */

export const emailTemplates = {
  permissionsChange: {
    subject: "Swamp Study Account Type Change Request",
    text: `You recently requested to change your account type to educator. Please respond with documentation verifying your current status as a lecturer or professor.`,
  },
  passwordRecovery: {
    subject: "Swamp Study Password Recovery",
    text: (
      resetLink: string,
    ) => `You requested a password reset. Click the link below to reset your password:

${resetLink}
                                       
If you did not request a password reset, please ignore this email.`,
  },
};
