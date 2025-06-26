
import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
  onLocationSelect: (coordinates: { lat: number; lng: number }) => void;
}

const MapPicker = ({ onLocationSelect }: MapPickerProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize Leaflet map
    map.current = L.map(mapContainer.current).setView([40.7128, -74.006], 12);

    // Add OpenStreetMap tiles (free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Add click handler to map
    map.current.on('click', (e: L.LeafletMouseEvent) => {
      const coordinates = {
        lat: e.latlng.lat,
        lng: e.latlng.lng
      };

      setSelectedLocation(coordinates);
      onLocationSelect(coordinates);

      // Remove existing marker if any
      if (marker.current) {
        map.current?.removeLayer(marker.current);
      }

      // Add new marker
      marker.current = L.marker([coordinates.lat, coordinates.lng])
        .addTo(map.current!)
        .bindPopup(`Selected location: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`)
        .openPopup();

      toast({
        title: "Location Selected",
        description: `Coordinates: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [onLocationSelect, toast]);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Click on the map to select your parking location
      </div>
      <div 
        ref={mapContainer} 
        className="w-full h-64 rounded-lg border shadow-sm"
        style={{ minHeight: '300px' }}
      />
      {selectedLocation && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
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
