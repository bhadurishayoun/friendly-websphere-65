
/**
 * Email service utility for sending contact form messages
 */

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends a contact form message using the Nodemailer API endpoint
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // This would point to your deployed serverless function or API endpoint
    const apiUrl = 'https://your-api-endpoint.com/api/send-email';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send message');
    }

    return {
      success: true,
      message: data.message || 'Message sent successfully!',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send message',
    };
  }
}
