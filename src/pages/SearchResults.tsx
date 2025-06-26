
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Car, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SearchResults = () => {
  const location = useLocation();
  const { destination, subLocation } = location.state || {};
  const { toast } = useToast();

  // TODO: Replace with actual database query based on search parameters
  // For now, using mock data
  const mockResults = [
    {
      id: 1,
      mainLocation: "Downtown Office Complex",
      subLocation: "Building A, Level 2",
      carSpaces: 2,
      scooterSpaces: 1,
      pricePerHour: 5.00,
      contactDetail: "+1 (555) 123-4567",
      distance: "0.2 miles",
      availability: "Available now"
    },
    {
      id: 2,
      mainLocation: "City Center Plaza",
      subLocation: "Main Street Entrance",
      carSpaces: 1,
      scooterSpaces: 3,
      pricePerHour: 4.50,
      contactDetail: "parking@cityplaza.com",
      distance: "0.4 miles",
      availability: "Available now"
    },
    {
      id: 3,
      mainLocation: "Shopping Mall North",
      subLocation: "Ground Floor, Section B",
      carSpaces: 3,
      scooterSpaces: 2,
      pricePerHour: 3.00,
      contactDetail: "+1 (555) 987-6543",
      distance: "0.6 miles",
      availability: "Available in 15 min"
    },
    {
      id: 4,
      mainLocation: "Business District Hub",
      subLocation: "Tower C, Basement Level",
      carSpaces: 1,
      scooterSpaces: 4,
      pricePerHour: 6.00,
      contactDetail: "contact@businesshub.com",
      distance: "0.8 miles",
      availability: "Available now"
    }
  ];

  const handleBook = (parkingSpot: typeof mockResults[0]) => {
    // TODO: Implement actual booking logic with database
    toast({
      title: "Booking Confirmed!",
      description: `Your spot at ${parkingSpot.mainLocation} has been reserved.`
    });
  };

  const handleContact = (contactDetail: string) => {
    if (contactDetail.includes("@")) {
      window.location.href = `mailto:${contactDetail}`;
    } else {
      window.location.href = `tel:${contactDetail}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Summary */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <h3 className="font-medium">
                  Parking near: {destination}
                  {subLocation && ` • ${subLocation}`}
                </h3>
                <p className="text-sm text-gray-600">
                  Found {mockResults.length} available parking spots
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid gap-6">
          {mockResults.map((spot) => (
            <Card key={spot.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{spot.mainLocation}</CardTitle>
                    <p className="text-gray-600">{spot.subLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ${spot.pricePerHour}/hr
                    </p>
                    <p className="text-sm text-gray-500">{spot.distance} away</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      {spot.carSpaces} car spaces, {spot.scooterSpaces} scooter spaces
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">{spot.availability}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => handleBook(spot)}
                    className="flex-1"
                  >
                    Book This Spot
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleContact(spot.contactDetail)}
                    className="flex items-center gap-2"
                  >
                    {spot.contactDetail.includes("@") ? (
                      <Mail className="w-4 h-4" />
                    ) : (
                      <Phone className="w-4 h-4" />
                    )}
                    Contact Owner
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results message would go here in real implementation */}
        {mockResults.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No parking spots found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search location or check back later for new listings.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
