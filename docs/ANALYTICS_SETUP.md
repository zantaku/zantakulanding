# Setting up Google Analytics for Zantaku.com

This guide explains how to set up Google Analytics 4 (GA4) for tracking visitors on zantaku.com.

## Prerequisites

- A Google account
- Access to the zantaku.com production environment

## Step 1: Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/) and sign in with your Google account
2. Click on "Admin" in the bottom left corner
3. In the Account column, click "Create Account"
4. Fill in the account details:
   - Account name: Zantaku
   - Configure the data sharing settings as needed
   - Click "Next"
5. Set up a property:
   - Property name: Zantaku Website
   - Reporting time zone and currency as appropriate
   - Click "Next"
6. Fill in your business information and click "Create"
7. Accept the terms of service

## Step 2: Set Up Data Collection

1. In your newly created property, go to "Data Streams" under the Property column
2. Click "Add stream" and select "Web"
3. Enter the website details:
   - Website URL: https://zantaku.com
   - Stream name: Zantaku Web
   - Click "Create stream"
4. After creating the stream, you'll see your Measurement ID (it starts with "G-")
5. **Copy this Measurement ID** - you'll need it in the next step

## Step 3: Add the Measurement ID to Your Application

There are two ways to add your Measurement ID to the application:

### Option 1: Environment Variable (Recommended)

Add the following environment variable to your production environment:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### Option 2: Direct Code Edit

If you can't set environment variables, you can directly edit the file:

1. Open `src/config/analytics.ts`
2. Replace the placeholder with your actual Measurement ID:

```typescript
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual ID
```

## Step 4: Verify Installation

1. Deploy your application to production
2. Visit your website
3. In Google Analytics, go to "Reports" > "Realtime"
4. You should see your visit recorded in real-time

## Additional Event Tracking

The application is already set up to track page views automatically. To track additional events:

```typescript
import { trackEvent } from '../utils/analytics';

// Example: Track a button click
trackEvent('button_click', { button_id: 'signup_button' });

// Example: Track a form submission
trackEvent('form_submit', { form_name: 'contact_form', success: true });
```

## Troubleshooting

- Make sure your ad-blocker is disabled when testing
- Check the browser console for any errors related to analytics
- Verify that the Measurement ID is correctly set
- Ensure that the domain in Google Analytics matches your actual domain 