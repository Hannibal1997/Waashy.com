# Google Maps Setup Instructions

## Getting a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Go to "Credentials" and create a new API key
5. Restrict the API key to your domain for security

## Setting up the API Key

Replace `YOUR_GOOGLE_MAPS_API_KEY` in the OneTimeBookingPage.tsx file with your actual API key:

```typescript
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY_HERE&libraries=places`;
```

## Features Included

- Interactive Google Maps with click-to-select location
- Draggable marker for precise location selection
- Address search with autocomplete (restricted to UAE)
- Reverse geocoding to get address from coordinates
- Real-time address updates when marker is moved

## Security Notes

- Always restrict your API key to specific domains
- Consider using environment variables for production
- Monitor your API usage in the Google Cloud Console
