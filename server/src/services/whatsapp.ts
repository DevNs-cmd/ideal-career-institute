/**
 * WhatsApp Integration Service for Ideal Career Institute
 * 
 * Provides:
 * 1. Working Click-to-Chat URL generation with course-specific prefilled messages.
 * 2. WhatsApp Business Platform API client architecture for automated transactional messages.
 */

export interface WhatsAppConfig {
  phoneNumberId?: string;
  accessToken?: string;
  businessAccountId?: string;
  defaultPhone: string;
}

const config: WhatsAppConfig = {
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
  defaultPhone: process.env.INSTITUTE_PHONE || '917011667297'
};

/**
 * Generate a direct Click-to-Chat URL with pre-filled enquiry message
 */
export function generateWhatsAppLink(params: {
  courseName?: string;
  studentName?: string;
  customMessage?: string;
}): string {
  const phone = config.defaultPhone.replace(/\D/g, '');
  let message = '';

  if (params.customMessage) {
    message = params.customMessage;
  } else if (params.courseName) {
    message = `Hello Ideal Career Institute, I am interested in your ${params.courseName} course. Please share the course details and admission information.`;
  } else {
    message = `Hello Ideal Career Institute, I would like to enquire about admission and course details.`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * WhatsApp Business Cloud API Integration
 * Sends an automated template or text message when API credentials are provided.
 */
export async function sendWhatsAppMessage(toPhone: string, messageText: string): Promise<{ success: boolean; status: string; messageId?: string; requiresConfig?: boolean }> {
  const cleanPhone = toPhone.replace(/\D/g, '');

  if (!config.phoneNumberId || !config.accessToken) {
    // Graceful reporting as required by prompt guidelines
    return {
      success: false,
      status: 'API_CREDENTIALS_REQUIRED',
      requiresConfig: true
    };
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${config.phoneNumberId}/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanPhone,
        type: 'text',
        text: { preview_url: false, body: messageText }
      })
    });

    const data = await response.json() as any;
    if (response.ok && data.messages?.[0]?.id) {
      return { success: true, status: 'SENT', messageId: data.messages[0].id };
    } else {
      return { success: false, status: data.error?.message || 'FAILED_SENDING' };
    }
  } catch (error: any) {
    return { success: false, status: error.message || 'NETWORK_ERROR' };
  }
}
