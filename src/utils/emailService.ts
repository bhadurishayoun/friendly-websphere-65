
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
    // UPDATE THIS URL with your actual deployed serverless function URL
    // Examples:
    // - Vercel: https://your-project-name.vercel.app/api/send-email
    // - Netlify: https://your-site-name.netlify.app/.netlify/functions/send-email
    const apiUrl = 'https://your-api-endpoint.com/api/send-email';
    
    console.log('Sending email to:', apiUrl, 'with data:', formData);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log('Email API response:', data);

    if (!response.ok) {
      console.error('Email API error:', data);
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
      message: error instanceof Error 
        ? `Error: ${error.message}` 
        : 'Failed to send message. Check console for details.',
    };
  }
}
