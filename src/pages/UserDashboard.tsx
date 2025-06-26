
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Car } from "lucide-react";

const UserDashboard = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchData, setSearchData] = useState({
    destination: "",
    subLocation: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Searching for parking spots...",
      description: "Finding available spaces near your destination"
    });
    
    setShowBookingModal(false);
    navigate("/search-results", { 
      state: { 
        destination: searchData.destination, 
        subLocation: searchData.subLocation 
      } 
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-600">Welcome back!</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Bookings</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$87</div>
              <p className="text-xs text-muted-foreground">Compared to street parking</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Spots</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Bookmarked locations</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Action */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Your Perfect Parking Spot</CardTitle>
            <p className="text-gray-600">Search for available parking spaces near your destination</p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowBookingModal(true)}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Search className="w-4 h-4 mr-2" />
              Book My Spot
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Downtown Office Complex</h4>
                  <p className="text-sm text-gray-600">Building A, Level 2 • Dec 20, 2024</p>
                  <p className="text-sm text-green-600">$15.00 • 3 hours</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Shopping Mall Entrance</h4>
                  <p className="text-sm text-gray-600">North Wing, Ground Floor • Dec 18, 2024</p>
                  <p className="text-sm text-green-600">$9.00 • 2 hours</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">City Center Plaza</h4>
                  <p className="text-sm text-gray-600">Main Street Entrance • Dec 15, 2024</p>
                  <p className="text-sm text-green-600">$20.00 • 4 hours</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Search Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Find Parking Near Your Destination</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination Location</Label>
              <Input
                id="destination"
                name="destination"
                placeholder="e.g., Downtown, Mall Area, Office Complex"
                value={searchData.destination}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subLocation">Sub Location (Optional)</Label>
              <Input
                id="subLocation"
                name="subLocation"
                placeholder="e.g., Near Building A, Main Entrance"
                value={searchData.subLocation}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                <Search className="w-4 h-4 mr-2" />
                Search Parking Spots
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowBookingModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
