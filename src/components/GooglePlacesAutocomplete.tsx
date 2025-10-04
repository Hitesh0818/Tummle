import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { MapPin, X, Plus } from "lucide-react";

// Mock Google Places API - In production, replace with actual Google Places API
interface GooglePlace {
  place_id: string;
  formatted_address: string;
  name: string;
  types: string[];
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface LocationWithRadius {
  placeId: string;
  formattedAddress: string;
  name: string;
  types: string[];
  lat: number;
  lng: number;
  radius?: number;
  radiusUnit: string;
  level: 'country' | 'state' | 'city' | 'district' | 'street';
  radiusRequired: boolean;
  radiusAllowed: boolean;
}

interface GooglePlacesAutocompleteProps {
  selectedLocations: LocationWithRadius[];
  onLocationAdd: (location: LocationWithRadius) => void;
  onLocationRemove: (location: LocationWithRadius) => void;
  placeholder: string;
  language: 'de' | 'en';
}

// Mock Places API data - In production, this would come from Google Places API
const mockPlacesData: GooglePlace[] = [
  // Countries
  {
    place_id: "ChIJa76xwh5AlertRMvM5jpa_ZfV6D",
    formatted_address: "Deutschland",
    name: "Deutschland",
    types: ["country", "political"],
    address_components: [
      { long_name: "Deutschland", short_name: "DE", types: ["country", "political"] }
    ],
    geometry: { location: { lat: 51.1657, lng: 10.4515 } }
  },
  {
    place_id: "ChIJ2V-Mo_l1nkcRfZixfUq4DAE_country",
    formatted_address: "Frankreich",
    name: "Frankreich",
    types: ["country", "political"],
    address_components: [
      { long_name: "Frankreich", short_name: "FR", types: ["country", "political"] }
    ],
    geometry: { location: { lat: 46.2276, lng: 2.2137 } }
  },
  
  // States
  {
    place_id: "ChIJwe1EZjDG-VYRaFuuFE_qJNE",
    formatted_address: "Bayern, Deutschland",
    name: "Bayern",
    types: ["administrative_area_level_1", "political"],
    address_components: [
      { long_name: "Bayern", short_name: "BY", types: ["administrative_area_level_1", "political"] },
      { long_name: "Deutschland", short_name: "DE", types: ["country", "political"] }
    ],
    geometry: { location: { lat: 48.7904, lng: 11.4979 } }
  },
  {
    place_id: "ChIJBxiT_ZETGkcRW-WV-Hwa-kb",
    formatted_address: "Nordrhein-Westfalen, Deutschland",
    name: "Nordrhein-Westfalen",
    types: ["administrative_area_level_1", "political"],
    address_components: [
      { long_name: "Nordrhein-Westfalen", short_name: "NRW", types: ["administrative_area_level_1", "political"] },
      { long_name: "Deutschland", short_name: "DE", types: ["country", "political"] }
    ],
    geometry: { location: { lat: 51.4332, lng: 7.6616 } }
  },
  
  // Cities
  {
    place_id: "ChIJAVkDPzdOqEcRcDteW0YgIQQ",
    formatted_address: "München, Deutschland",
    name: "München",
    types: ["locality", "political"],
    address_components: [
      { long_name: "München", short_name: "München", types: ["locality", "political"] },
      { long_name: "Bayern", short_name: "BY", types: ["administrative_area_level_1", "political"] },
      { long_name: "Deutschland", short_name: "DE", types: ["country", "political"] }
    ],
    geometry: { location: { lat: 48.1351, lng: 11.5820 } }
  },
  {
    place_id: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
    formatted_address: "Berlin, Deutschland", 
    name: "Berlin",
    types: ["locality", "political"],
    address_components: [
      { long_name: "Berlin", short_name: "Berlin", types: ["locality", "political"] },
      { long_name: "Deutschland", short_name: "DE", types: ["country", "political"] }
    ],
    geometry: { location: { lat: 52.5200, lng: 13.4050 } }
  },
  {
    place_id: "ChIJuRMYfoHG2EcRoDrWe_I9JgQ", 
    formatted_address: "Hamburg, Deutschland",
    name: "Hamburg",
    types: ["locality", "political"],
    address_components: [
      { long_name: "Hamburg", short_name: "HH", types: ["locality", "political"] },
      { long_name: "Deutschland", short_name: "DE", types: ["country", "political"] }
    ],
    geometry: { location: { lat: 53.5511, lng: 9.9937 } }
  },
  {
    place_id: "ChIJ2V-Mo_l1nkcRfZixfUq4DAE",
    formatted_address: "Paris, Frankreich",
    name: "Paris", 
    types: ["locality", "political"],
    address_components: [
      { long_name: "Paris", short_name: "Paris", types: ["locality", "political"] },
      { long_name: "Frankreich", short_name: "FR", types: ["country", "political"] }
    ],
    geometry: { location: { lat: 48.8566, lng: 2.3522 } }
  },
  {
    place_id: "ChIJOwg_06VPwokRYv534QaPC8g",
    formatted_address: "New York, NY, USA",
    name: "New York",
    types: ["locality", "political"], 
    address_components: [
      { long_name: "New York", short_name: "NYC", types: ["locality", "political"] },
      { long_name: "New York", short_name: "NY", types: ["administrative_area_level_1", "political"] },
      { long_name: "USA", short_name: "US", types: ["country", "political"] }
    ],
    geometry: { location: { lat: 40.7128, lng: -74.0060 } }
  },
  {
    place_id: "ChIJ8bH53)0FnkcRA7CKuf4CrxE",
    formatted_address: "Köln, Deutschland",
    name: "Köln",
    types: ["locality", "political"],
    address_components: [
      { long_name: "Köln", short_name: "Köln", types: ["locality", "political"] },
      { long_name: "Nordrhein-Westfalen", short_name: "NRW", types: ["administrative_area_level_1", "political"] },
      { long_name: "Deutschland", short_name: "DE", types: ["country", "political"] }
    ],
    geometry: { location: { lat: 50.9375, lng: 6.9603 } }
  },
  
  // Districts/Neighborhoods
  {
    place_id: "ChIJb09Jxk4EqEcRvQYoAE-0gP4",
    formatted_address: "Maxvorstadt, München, Deutschland",
    name: "Maxvorstadt",
    types: ["sublocality", "political"],
    address_components: [
      { long_name: "Maxvorstadt", short_name: "Maxvorstadt", types: ["sublocality", "political"] },
      { long_name: "München", short_name: "München", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 48.1500, lng: 11.5700 } }
  },
  {
    place_id: "ChIJMzf-MFhRqEcRN6pASK2nZFo",
    formatted_address: "Schwabing, München, Deutschland",
    name: "Schwabing",
    types: ["sublocality", "political"],
    address_components: [
      { long_name: "Schwabing", short_name: "Schwabing", types: ["sublocality", "political"] },
      { long_name: "München", short_name: "München", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 48.1642, lng: 11.5816 } }
  },
  {
    place_id: "ChIJf1PJk_dQqEcRc1_dQu6mtlE",
    formatted_address: "Altstadt-Lehel, München, Deutschland",
    name: "Altstadt-Lehel",
    types: ["sublocality", "political"],
    address_components: [
      { long_name: "Altstadt-Lehel", short_name: "Altstadt-Lehel", types: ["sublocality", "political"] },
      { long_name: "München", short_name: "München", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 48.1408, lng: 11.5792 } }
  },
  {
    place_id: "ChIJOzJF8_BRqEcR4JF-cFWcTds",
    formatted_address: "Mitte, Berlin, Deutschland",
    name: "Mitte",
    types: ["sublocality", "political"],
    address_components: [
      { long_name: "Mitte", short_name: "Mitte", types: ["sublocality", "political"] },
      { long_name: "Berlin", short_name: "Berlin", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 52.5200, lng: 13.4050 } }
  },
  
  // Street Addresses
  {
    place_id: "ChIJ5TMHVskJqEcRcDteW0YgIQQ",
    formatted_address: "Marienplatz 1, 80331 München, Deutschland",
    name: "Marienplatz 1",
    types: ["street_address"],
    address_components: [
      { long_name: "1", short_name: "1", types: ["street_number"] },
      { long_name: "Marienplatz", short_name: "Marienplatz", types: ["route"] },
      { long_name: "Altstadt-Lehel", short_name: "Altstadt-Lehel", types: ["sublocality", "political"] },
      { long_name: "München", short_name: "München", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 48.1372, lng: 11.5756 } }
  },
  {
    place_id: "ChIJN7bgq7JRqEcRsKCsZa6Y5vs",
    formatted_address: "Leopoldstraße 100, 80802 München, Deutschland",
    name: "Leopoldstraße 100",
    types: ["street_address"],
    address_components: [
      { long_name: "100", short_name: "100", types: ["street_number"] },
      { long_name: "Leopoldstraße", short_name: "Leopoldstraße", types: ["route"] },
      { long_name: "Schwabing-West", short_name: "Schwabing-West", types: ["sublocality", "political"] },
      { long_name: "München", short_name: "München", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 48.1642, lng: 11.5816 } }
  },
  {
    place_id: "ChIJj)3KGf5RqEcRd0F_MCGhtXg",
    formatted_address: "Unter den Linden 77, 10117 Berlin, Deutschland",
    name: "Unter den Linden 77",
    types: ["street_address"],
    address_components: [
      { long_name: "77", short_name: "77", types: ["street_number"] },
      { long_name: "Unter den Linden", short_name: "Unter den Linden", types: ["route"] },
      { long_name: "Mitte", short_name: "Mitte", types: ["sublocality", "political"] },
      { long_name: "Berlin", short_name: "Berlin", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 52.5170, lng: 13.3889 } }
  },
  {
    place_id: "ChIJK5fEP&lRqEcRr9F_lCGhtXg",
    formatted_address: "Alexanderplatz 1, 10178 Berlin, Deutschland",
    name: "Alexanderplatz 1",
    types: ["street_address"],
    address_components: [
      { long_name: "1", short_name: "1", types: ["street_number"] },
      { long_name: "Alexanderplatz", short_name: "Alexanderplatz", types: ["route"] },
      { long_name: "Mitte", short_name: "Mitte", types: ["sublocality", "political"] },
      { long_name: "Berlin", short_name: "Berlin", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 52.5219, lng: 13.4132 } }
  },
  {
    place_id: "ChIJgTwJklAFnkcRA7CKuf4CrxE",
    formatted_address: "Domplatz 1, 50667 Köln, Deutschland",
    name: "Domplatz 1",
    types: ["street_address"],
    address_components: [
      { long_name: "1", short_name: "1", types: ["street_number"] },
      { long_name: "Domplatz", short_name: "Domplatz", types: ["route"] },
      { long_name: "Altstadt-Nord", short_name: "Altstadt-Nord", types: ["sublocality", "political"] },
      { long_name: "Köln", short_name: "Köln", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 50.9413, lng: 6.9583 } }
  },
  {
    place_id: "ChIJ8kKGkkAFnkcRA7CKuf4CrxE",
    formatted_address: "Schildergasse 65, 50667 Köln, Deutschland",
    name: "Schildergasse 65",
    types: ["street_address"],
    address_components: [
      { long_name: "65", short_name: "65", types: ["street_number"] },
      { long_name: "Schildergasse", short_name: "Schildergasse", types: ["route"] },
      { long_name: "Altstadt-Nord", short_name: "Altstadt-Nord", types: ["sublocality", "political"] },
      { long_name: "Köln", short_name: "Köln", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 50.9364, lng: 6.9499 } }
  },
  {
    place_id: "ChIJkwGHklAFnkcRA7CKuf4CrxE",
    formatted_address: "Mönckebergstraße 17, 20095 Hamburg, Deutschland",
    name: "Mönckebergstraße 17",
    types: ["street_address"],
    address_components: [
      { long_name: "17", short_name: "17", types: ["street_number"] },
      { long_name: "Mönckebergstraße", short_name: "Mönckebergstraße", types: ["route"] },
      { long_name: "Altstadt", short_name: "Altstadt", types: ["sublocality", "political"] },
      { long_name: "Hamburg", short_name: "Hamburg", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 53.5510, lng: 10.0001 } }
  },
  {
    place_id: "ChIJkCC_mkAFnkcRA7CKuf4CrxE",
    formatted_address: "Reeperbahn 123, 20359 Hamburg, Deutschland",
    name: "Reeperbahn 123",
    types: ["street_address"],
    address_components: [
      { long_name: "123", short_name: "123", types: ["street_number"] },
      { long_name: "Reeperbahn", short_name: "Reeperbahn", types: ["route"] },
      { long_name: "St. Pauli", short_name: "St. Pauli", types: ["sublocality", "political"] },
      { long_name: "Hamburg", short_name: "Hamburg", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 53.5496, lng: 9.9646 } }
  },
  
  // Routes/Streets (without numbers)
  {
    place_id: "ChIJm7FGklAFnkcRA7CKuf4CrxE",
    formatted_address: "Marienplatz, 80331 München, Deutschland",
    name: "Marienplatz",
    types: ["route"],
    address_components: [
      { long_name: "Marienplatz", short_name: "Marienplatz", types: ["route"] },
      { long_name: "Altstadt-Lehel", short_name: "Altstadt-Lehel", types: ["sublocality", "political"] },
      { long_name: "München", short_name: "München", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 48.1372, lng: 11.5756 } }
  },
  {
    place_id: "ChIJlGCFklAFnkcRA7CKuf4CrxE",
    formatted_address: "Leopoldstraße, München, Deutschland",
    name: "Leopoldstraße",
    types: ["route"],
    address_components: [
      { long_name: "Leopoldstraße", short_name: "Leopoldstraße", types: ["route"] },
      { long_name: "München", short_name: "München", types: ["locality", "political"] }
    ],
    geometry: { location: { lat: 48.1560, lng: 11.5810 } }
  }
];

function determineLocationLevel(types: string[]): LocationWithRadius['level'] {
  // Street address (most specific)
  if (types.includes('street_address') || 
      types.includes('premise') || 
      (types.includes('route') && types.includes('street_number'))) {
    return 'street';
  }
  
  // Just a street/route without number
  if (types.includes('route') && !types.includes('street_number')) {
    return 'street'; // Still treat as street level for radius requirement
  }
  
  // District/Neighborhood
  if (types.includes('sublocality') || 
      types.includes('sublocality_level_1') ||
      types.includes('neighborhood')) {
    return 'district';
  }
  
  // City
  if (types.includes('locality') || types.includes('postal_town')) {
    return 'city';
  }
  
  // State/Province
  if (types.includes('administrative_area_level_1')) {
    return 'state';
  }
  
  // Country
  if (types.includes('country')) {
    return 'country';
  }
  
  // Default fallback
  return 'city';
}

function getRadiusConfig(level: LocationWithRadius['level']) {
  switch (level) {
    case 'street':
      return { required: true, allowed: true, defaultRadius: 3 };
    case 'district':
    case 'city':
      return { required: false, allowed: true, defaultRadius: undefined };
    case 'state':
    case 'country':
      return { required: false, allowed: false, defaultRadius: undefined };
    default:
      return { required: false, allowed: true, defaultRadius: undefined };
  }
}

const translations = {
  de: {
    searchPlaceholder: "Ort suchen (z.B. München, Marienplatz, Deutschland)...",
    noResults: "Keine Ergebnisse gefunden",
    radiusRequired: "Radius erforderlich",
    radiusOptional: "Radius (optional)",
    radiusNotApplicable: "Radius nicht anwendbar",
    km: "km",
    levelLabels: {
      street: "Straße/Adresse",
      district: "Stadtteil", 
      city: "Stadt",
      state: "Bundesland",
      country: "Land"
    }
  },
  en: {
    searchPlaceholder: "Search location (e.g. Munich, Marienplatz, Germany)...",
    noResults: "No results found", 
    radiusRequired: "Radius required",
    radiusOptional: "Radius (optional)",
    radiusNotApplicable: "Radius not applicable",
    km: "km",
    levelLabels: {
      street: "Street/Address",
      district: "District",
      city: "City", 
      state: "State",
      country: "Country"
    }
  }
};

export function GooglePlacesAutocomplete({
  selectedLocations,
  onLocationAdd,
  onLocationRemove,
  placeholder,
  language
}: GooglePlacesAutocompleteProps) {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<GooglePlace[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = translations[language];

  // Mock Google Places Autocomplete API call
  const searchPlaces = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Filter mock data based on query - improved search logic
    const queryLower = query.toLowerCase();
    const filtered = mockPlacesData.filter(place => {
      // Search in name
      if (place.name.toLowerCase().includes(queryLower)) return true;
      
      // Search in formatted address
      if (place.formatted_address.toLowerCase().includes(queryLower)) return true;
      
      // Search in address components
      const addressMatch = place.address_components.some(component =>
        component.long_name.toLowerCase().includes(queryLower) ||
        component.short_name.toLowerCase().includes(queryLower)
      );
      
      return addressMatch;
    })
    
    // Sort results: street addresses first, then districts, cities, states, countries
    .sort((a, b) => {
      const levelOrder = { street: 0, district: 1, city: 2, state: 3, country: 4 };
      const aLevel = determineLocationLevel(a.types);
      const bLevel = determineLocationLevel(b.types);
      return levelOrder[aLevel] - levelOrder[bLevel];
    });
    
    setSuggestions(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchValue) {
        searchPlaces(searchValue);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  const handlePlaceSelect = (place: GooglePlace) => {
    const level = determineLocationLevel(place.types);
    const radiusConfig = getRadiusConfig(level);
    
    const location: LocationWithRadius = {
      placeId: place.place_id,
      formattedAddress: place.formatted_address,
      name: place.name,
      types: place.types,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      radius: radiusConfig.defaultRadius,
      radiusUnit: 'km',
      level,
      radiusRequired: radiusConfig.required,
      radiusAllowed: radiusConfig.allowed
    };

    onLocationAdd(location);
    setSearchValue('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleRadiusChange = (location: LocationWithRadius, newRadius: number) => {
    const updatedLocation = { ...location, radius: newRadius };
    // We need to update through parent component
    onLocationRemove(location);
    onLocationAdd(updatedLocation);
  };

  const getLevelIcon = (level: LocationWithRadius['level']) => {
    switch (level) {
      case 'country': return '🌍';
      case 'state': return '🏛️';
      case 'city': return '🏙️';
      case 'district': return '🏘️';
      case 'street': return '📍';
      default: return '📍';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={t.searchPlaceholder}
            className="pl-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                Loading...
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((place) => {
                const level = determineLocationLevel(place.types);
                const isAlreadySelected = selectedLocations.some(loc => loc.placeId === place.place_id);
                
                return (
                  <button
                    key={place.place_id}
                    type="button"
                    className={`w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 ${
                      isAlreadySelected ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''
                    }`}
                    onClick={() => !isAlreadySelected && handlePlaceSelect(place)}
                    disabled={isAlreadySelected}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getLevelIcon(level)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{place.name}</div>
                        <div className="text-xs text-gray-600 truncate">{place.formatted_address}</div>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {t.levelLabels[level]}
                      </Badge>
                    </div>
                    {isAlreadySelected && (
                      <div className="text-xs text-gray-400 mt-1">Already selected</div>
                    )}
                  </button>
                );
              })
            ) : searchValue.length >= 2 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                {t.noResults}
              </div>
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                Type at least 2 characters to search...
              </div>
            )}
          </div>
        )}

        {/* Overlay to close dropdown */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>

      {/* Selected Locations - Mobile Responsive */}
      {selectedLocations.length > 0 && (
        <div className="space-y-4">
          <Label className="text-primary font-medium">
            {language === 'de' ? 'Ausgewählte Standorte:' : 'Selected Locations:'}
          </Label>
          
          {/* Mobile: Card Layout */}
          <div className="block sm:hidden space-y-3">
            {selectedLocations.map((location) => (
              <div key={location.placeId} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getLevelIcon(location.level)}</span>
                        <Badge variant="outline" className="text-xs">
                          {t.levelLabels[location.level]}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm text-primary">{location.name}</h4>
                      <p className="text-xs text-gray-600 mt-1 break-words">{location.formattedAddress}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-red-100 text-red-500 hover:text-red-700 ml-2 flex-shrink-0 touch-manipulation"
                      onClick={() => onLocationRemove(location)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {location.radiusAllowed && (
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-gray-600">
                        {location.radiusRequired ? t.radiusRequired : t.radiusOptional}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={location.radius || ''}
                          onChange={(e) => handleRadiusChange(location, parseInt(e.target.value) || 0)}
                          className={`flex-1 h-12 ${location.radiusRequired && (!location.radius || location.radius <= 0) 
                            ? 'border-red-300 focus:border-red-500' 
                            : ''}`}
                          placeholder={location.radiusRequired ? "3" : ""}
                          disabled={!location.radiusAllowed}
                        />
                        <span className="text-sm text-gray-600 font-medium">{t.km}</span>
                        {location.radiusRequired && (
                          <span className="text-red-500 font-bold">*</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {!location.radiusAllowed && (
                    <div className="text-xs text-gray-400 italic bg-gray-50 p-2 rounded">
                      {t.radiusNotApplicable}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden sm:block border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Type</TableHead>
                  <TableHead className="flex-1">Location</TableHead>
                  <TableHead className="w-32">Radius</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedLocations.map((location) => (
                  <TableRow key={location.placeId}>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 text-xs">
                        <span>{getLevelIcon(location.level)}</span>
                        <span className="hidden sm:inline">{t.levelLabels[location.level]}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{location.name}</div>
                        <div className="text-xs text-gray-600 truncate max-w-xs">{location.formattedAddress}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {location.radiusAllowed ? (
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            value={location.radius || ''}
                            onChange={(e) => handleRadiusChange(location, parseInt(e.target.value) || 0)}
                            className={`w-16 text-xs ${location.radiusRequired && (!location.radius || location.radius <= 0) 
                              ? 'border-red-300 focus:border-red-500' 
                              : ''}`}
                            placeholder={location.radiusRequired ? "3" : ""}
                            disabled={!location.radiusAllowed}
                          />
                          <span className="text-xs text-gray-600">{t.km}</span>
                          {location.radiusRequired && (
                            <span className="text-xs text-red-500">*</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          {t.radiusNotApplicable}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 touch-manipulation"
                        onClick={() => onLocationRemove(location)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

    </div>
  );
}