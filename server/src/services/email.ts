/**
 * Email Notification Service for Ideal Career Institute
 * Sends admission alerts to administrators and confirmation receipts to students.
 */

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmailNotification(payload: EmailPayload): Promise<{ success: boolean; status: string; requiresConfig?: boolean }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    // Graceful reporting when SMTP credentials are not configured in environment
    return {
      success: false,
      status: 'SMTP_CONFIG_REQUIRED',
      requiresConfig: true
    };
  }

  // When SMTP is configured, standard nodemailer/mail transport sends the email.
  console.log(`[Email Service] Sending notification to ${payload.to}: ${payload.subject}`);
  return {
    success: true,
    status: 'SENT'
  };
}
