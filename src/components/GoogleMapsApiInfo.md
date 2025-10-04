# Google Maps API Integration

## 🗺️ **Current Implementation**

The GEO-Availability section now uses a **mock Google Places API** implementation that demonstrates the full functionality. For production deployment, you'll need to:

## 🔑 **Google Places API Setup**

### 1. Get API Key
```bash
# Get your Google Places API key from:
# https://console.cloud.google.com/apis/credentials
GOOGLE_PLACES_API_KEY=your_api_key_here
```

### 2. Enable Required APIs
- **Places API (New)** - for autocomplete and place details
- **Geocoding API** - for coordinate conversion
- **Maps JavaScript API** - if adding map visualization

### 3. Replace Mock Implementation

In `/components/GooglePlacesAutocomplete.tsx`, replace the mock `searchPlaces` function:

```typescript
// Replace this mock function:
const searchPlaces = async (query: string) => {
  // Mock implementation...
}

// With real Google Places API:
const searchPlaces = async (query: string) => {
  if (query.length < 2) {
    setSuggestions([]);
    return;
  }

  setIsLoading(true);
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}&language=${language}`
    );
    
    const data = await response.json();
    
    // Convert to our LocationWithRadius format
    const places = await Promise.all(
      data.predictions.map(async (prediction: any) => {
        // Get place details for full address and coordinates
        const detailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${GOOGLE_PLACES_API_KEY}&fields=formatted_address,geometry,name,types,address_components`
        );
        return detailsResponse.json();
      })
    );
    
    setSuggestions(places.map(p => p.result));
  } catch (error) {
    console.error('Places API error:', error);
    setSuggestions([]);
  } finally {
    setIsLoading(false);
  }
};
```

## 🎯 **Geographic Hierarchy Logic**

### **Place Types & Radius Rules**
- **`street_address`, `route`, `street_number`** → Street level
  - ✅ **Radius REQUIRED** (default: 3km)
  - 📍 Example: "Marienplatz 1, 80331 München"
  
- **`sublocality`, `neighborhood`** → District level  
  - ⚪ **Radius OPTIONAL** (no default)
  - 🏘️ Example: "Maxvorstadt, München"
  
- **`locality`** → City level
  - ⚪ **Radius OPTIONAL** (no default)  
  - 🏙️ Example: "München, Deutschland"
  
- **`administrative_area_level_1`** → State level
  - ❌ **Radius NOT APPLICABLE** 
  - 🏛️ Example: "Bayern, Deutschland"
  
- **`country`** → Country level
  - ❌ **Radius NOT APPLICABLE**
  - 🌍 Example: "Deutschland"

## 🔧 **Technical Features**

### **Multi-Location Support**
```typescript
interface LocationWithRadius {
  placeId: string;           // Google Place ID
  formattedAddress: string;  // Full formatted address
  name: string;             // Place name
  types: string[];          // Google place types array
  lat: number;              // Latitude
  lng: number;              // Longitude
  radius?: number;          // Search radius in km
  radiusUnit: string;       // Unit (always 'km')
  level: 'country' | 'state' | 'city' | 'district' | 'street';
  radiusRequired: boolean;  // Whether radius is mandatory
  radiusAllowed: boolean;   // Whether radius field is enabled
}
```

### **Smart Validation**
- ✅ Validates required radius for street-level locations
- ✅ Prevents duplicate location selection  
- ✅ Shows appropriate UI state based on geographic level
- ✅ Provides helpful user guidance

### **User Experience**
- 🔍 **Real-time search** with debounced API calls
- 🏷️ **Visual indicators** showing geographic level (🌍🏛️🏙️🏘️📍)
- 💡 **Smart defaults** and usage hints
- 🎯 **Intelligent radius handling** based on location specificity
- 🚫 **Duplicate prevention** with visual feedback

## 🌍 **Use Cases Supported**

### **Seasonal/Travel Jobs**
```
✅ "Paris, France" (city-wide, no radius)
✅ "Greece" (country-wide, no radius)  
✅ "Santorini, Greece" (island-wide, optional radius)
```

### **Local/Commuter Jobs**  
```
✅ "Maxvorstadt, München" (district, optional radius)
✅ "München Hauptbahnhof" (specific location, required radius)
✅ "Leopoldstraße 1, München" (street address, required 3km radius)
```

### **Regional Jobs**
```
✅ "Bayern, Deutschland" (state-wide, no radius)  
✅ "Stuttgart, Deutschland" (city-wide, optional radius)
```

## 📊 **Performance Considerations**

- **Debounced search** (300ms) to minimize API calls
- **Caching** of place details to avoid repeated lookups  
- **Efficient filtering** to prevent duplicate selections
- **Lazy loading** of suggestions with loading states

## 🔒 **Security Notes**

- Store API key as environment variable
- Implement API key restrictions (HTTP referrers, IP addresses)
- Monitor API usage and set quotas
- Consider implementing server-side proxy for sensitive applications