
# Nodemailer Setup for Contact Form

This document outlines how to set up the Nodemailer functionality for the contact form on your personal website.

## Backend Setup

The contact form uses a serverless function with Nodemailer to send emails. Here's how to set it up:

### 1. Deploy the Serverless Function

The `api/send-email.js` file contains the serverless function code that needs to be deployed to a platform like Vercel, Netlify, or similar.

#### Deployment Steps:

1. Create a new project on your chosen platform (Vercel, Netlify, etc.)
2. Connect it to your GitHub repository
3. Configure the following environment variables:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password (not your regular password)

### 2. Create a Gmail App Password

For security, Google requires using App Passwords instead of your regular password for programmatic email sending:

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select Security
3. Under "Signing in to Google," select 2-Step Verification
4. At the bottom of the page, select App passwords
5. Enter a name for the app password (e.g., "My Website Contact Form")
6. Click "Create"
7. Use the generated 16-character password as your `EMAIL_PASS` environment variable

### 3. Update the Frontend Configuration

After deploying your serverless function, update the `apiUrl` in `src/utils/emailService.ts` to point to your deployed endpoint URL:

```typescript
// Replace this URL with your actual deployed serverless function URL
const apiUrl = 'https://your-deployed-function-url.com/api/send-email';
```

## Testing the Contact Form

To test the contact form:

1. Fill out all fields in the contact form
2. Submit the form
3. Check your email to verify that you received the message
4. Check the browser console for any error messages if it doesn't work

## Troubleshooting

If you encounter issues:

1. Verify that your environment variables are correctly set up
2. Make sure your Gmail account has "Less secure app access" enabled or use an App Password
3. Check the function logs on your deployment platform
4. Verify that the API URL in `emailService.ts` is correct
5. Test the API endpoint directly using a tool like Postman

