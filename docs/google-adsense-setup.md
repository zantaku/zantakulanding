# Google AdSense Integration Guide

This document provides information on the Google AdSense integration for Zantaku website.

## Setup Overview

Google AdSense has been integrated into the Zantaku website with the following components:

1. **Script Integration** - The Google AdSense script is included in:
   - `index.html` - For Vite/React development environment
   - `src/pages/_app.tsx` - For Next.js rendering

2. **Ad Component** - A reusable `GoogleAdSense` component has been created at `src/components/GoogleAdSense.tsx`

3. **Ad Placements** - Ads are currently placed in three strategic locations:
   - After the Hero Section
   - Before the Call to Action section
   - In the footer area

## Ad Slot IDs

Currently, the ad slots are using placeholder IDs. You need to update these with actual ad unit IDs from your Google AdSense dashboard:

- `1234567890` - Hero Section ad
- `0987654321` - Pre-Call to Action ad
- `2468013579` - Footer ad

## Updating Ad Slots

To update the ad slots with actual IDs from your Google AdSense account:

1. Log in to your Google AdSense account
2. Navigate to "Ads" → "By ad unit"
3. Create new ad units or use existing ones
4. Copy the ad slot ID for each ad unit
5. Replace the placeholder IDs in `src/App.tsx` with your actual ad slot IDs

## AdSense Verification

After implementing AdSense, you need to verify your website:

1. Google may require you to place an additional verification code on your site
2. If needed, add this code to `index.html` and/or `_app.tsx`
3. Wait for Google to review and approve your site (typically 1-3 days)

## Ad Policy Compliance

Ensure your website complies with Google AdSense policies:

- Implement a clear Privacy Policy that mentions the use of Google AdSense
- Ensure your content adheres to AdSense program policies
- Don't place too many ads on a single page (maximum 3-4 is recommended)
- Don't click on your own ads (this violates AdSense terms)

## Recent Policy Compliance Updates

We've updated the implementation to address Google AdSense policy violations, particularly regarding "Google-served ads on screens without publisher-content" and "low value content" issues:

1. **Content Verification**:
   - Added a `contentVerified` prop to the `GoogleAdSense` component
   - Implemented content checking to ensure ads only appear alongside substantial content
   - Added a minimum content threshold (300 characters) around each ad placement

2. **Enhanced Content Around Ads**:
   - Added descriptive, valuable content sections around each ad placement
   - Ensured each ad appears within a context that provides value to users
   - Expanded footer with navigation links and additional information

3. **Privacy Policy**:
   - Created a dedicated Privacy Policy page at `/privacy-policy`
   - Included a specific section about Google AdSense usage
   - Added direct links to the Privacy Policy in the footer

4. **Component Intelligence**:
   - Updated the ad component to detect and avoid low-value content situations
   - Added fallback display when content requirements aren't met
   - Improved logging for troubleshooting

These changes ensure compliance with Google's requirements that ads should only appear alongside valuable content and not on pages with minimal or low-value content.

## Testing Ads

During development, ads won't display actual content. To test ad placements:

1. Use the Google AdSense preview tool
2. Check that ad containers render correctly at different screen sizes
3. Verify that ads don't negatively impact your site's performance

## Custom Ad Configurations

The `GoogleAdSense` component supports various configurations:

```tsx
<GoogleAdSense
  adSlot="your-ad-slot-id"  // Required: your ad unit ID
  adFormat="auto"           // Optional: 'auto', 'fluid', 'rectangle', 'vertical'
  responsive={true}         // Optional: whether the ad should be responsive
  layout=""                 // Optional: specific ad layout if needed
  className="custom-class"  // Optional: additional CSS classes
  style={{ margin: '20px' }} // Optional: inline styles
  contentVerified={true}    // Optional: override content verification
/>
```

## Troubleshooting

If ads aren't displaying:

1. Check browser console for errors
2. Verify that ad blocker extensions aren't active
3. Ensure correct ad slot IDs are being used
4. Confirm your AdSense account is active and approved
5. Check for any policy violations in your AdSense account
6. Allow 24-48 hours for ads to start appearing after initial setup

For additional help, refer to the [Google AdSense Help Center](https://support.google.com/adsense/). 