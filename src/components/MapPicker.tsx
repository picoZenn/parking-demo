
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MapPickerProps {
  onLocationSelect: (coordinates: { lat: number; lng: number }) => void;
}

const MapPicker = ({ onLocationSelect }: MapPickerProps) => {
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const { toast } = useToast();

  const initializeMap = async () => {
    if (!mapboxToken) {
      toast({
        title: "Mapbox Token Required",
        description: "Please enter your Mapbox public token to use the map."
      });
      return;
    }

    try {
      // Dynamically import mapbox-gl to avoid SSR issues
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.default.accessToken = mapboxToken;
      
      if (!mapContainer.current) return;

      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.006, 40.7128], // New York City default
        zoom: 12
      });

      // Add click handler
      map.current.on('click', (e: any) => {
        const coordinates = {
          lat: e.lngLat.lat,
          lng: e.lngLat.lng
        };
        
        setSelectedLocation(coordinates);
        onLocationSelect(coordinates);

        // Add marker
        if (map.current.getLayer('selected-location')) {
          map.current.removeLayer('selected-location');
          map.current.removeSource('selected-location');
        }

        map.current.addSource('selected-location', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: [coordinates.lng, coordinates.lat]
            }
          }
        });

        map.current.addLayer({
          id: 'selected-location',
          type: 'circle',
          source: 'selected-location',
          paint: {
            'circle-radius': 8,
            'circle-color': '#3b82f6',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });

        toast({
          title: "Location Selected",
          description: `Coordinates: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`
        });
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Map Error",
        description: "Failed to initialize map. Please check your Mapbox token."
      });
    }
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="space-y-4">
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Mapbox Integration Required
          </h3>
          <p className="text-gray-600 mb-4">
            To use the map picker, please enter your Mapbox public token.
            You can get one at{" "}
            <a 
              href="https://mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="max-w-md mx-auto space-y-3">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button onClick={initializeMap} disabled={!mapboxToken}>
              Initialize Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Click on the map to select your parking location
      </div>
      <div 
        ref={mapContainer} 
        className="w-full h-64 rounded-lg border"
        style={{ minHeight: '300px' }}
      />
      {selectedLocation && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <MapPin className="w-4 h-4" />
          <span>
            Location selected: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
          </span>
        </div>
      )}
    </div>
  );
};

export default MapPicker;
