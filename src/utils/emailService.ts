
/**
 * Form service utility for sending contact form messages
 */

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends a contact form message using FormSubmit.co service
 * This eliminates the need for your own backend service
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // IMPORTANT: Replace this email with your actual email
    // FormSubmit.co will send all form submissions to this email address
    const yourEmail = "youremail@example.com";
    
    const apiUrl = `https://formsubmit.co/${yourEmail}`;
    
    console.log('Sending form data to:', apiUrl, 'with data:', formData);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        _captcha: false, // Set to true if you want CAPTCHA protection
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Form submission error:', errorData || response.statusText);
      throw new Error(errorData?.message || 'Failed to send message');
    }

    const data = await response.json();
    console.log('Form submission response:', data);

    return {
      success: true,
      message: 'Message sent successfully!',
    };
  } catch (error) {
    console.error('Error sending form:', error);
    return {
      success: false,
      message: error instanceof Error 
        ? `Error: ${error.message}` 
        : 'Failed to send message. Please try again later.',
    };
  }
}
