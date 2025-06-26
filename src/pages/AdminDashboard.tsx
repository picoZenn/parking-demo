import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Plus, Car } from "lucide-react";
import MapPicker from "@/components/MapPicker";

const AdminDashboard = () => {
  const [showListingModal, setShowListingModal] = useState(false);
  const [formData, setFormData] = useState({
    mainLocation: "",
    subLocation: "",
    carSpaces: "",
    scooterSpaces: "",
    pricePerHour: "",
    contactDetail: "",
    coordinates: null as { lat: number; lng: number } | null
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Connect to database to save parking space listing
    console.log("Parking space data to save:", formData);
    
    toast({
      title: "Parking Space Listed!",
      description: "Your parking space has been successfully listed."
    });
    
    setShowListingModal(false);
    setFormData({
      mainLocation: "",
      subLocation: "",
      carSpaces: "",
      scooterSpaces: "",
      pricePerHour: "",
      contactDetail: "",
      coordinates: null
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, Parking Space Owner!</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Parking spaces listed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$342</div>
              <p className="text-xs text-muted-foreground">From bookings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Action */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Manage Your Parking Spaces</CardTitle>
            <p className="text-gray-600">List new spaces or manage existing ones</p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowListingModal(true)}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              List My Parking Space
            </Button>
          </CardContent>
        </Card>

        {/* Existing Listings Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Current Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Downtown Office Complex</h4>
                  <p className="text-sm text-gray-600">Building A, Level 2</p>
                  <p className="text-sm text-green-600">$5/hour • 2 cars, 1 scooter</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Shopping Mall Entrance</h4>
                  <p className="text-sm text-gray-600">North Wing, Ground Floor</p>
                  <p className="text-sm text-green-600">$3/hour • 1 car, 3 scooters</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listing Modal */}
      <Dialog open={showListingModal} onOpenChange={setShowListingModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>List Your Parking Space</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainLocation">Main Location</Label>
                <Input
                  id="mainLocation"
                  name="mainLocation"
                  placeholder="e.g., Downtown, Mall Area"
                  value={formData.mainLocation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subLocation">Sub Location</Label>
                <Input
                  id="subLocation"
                  name="subLocation"
                  placeholder="e.g., Building A, Level 2"
                  value={formData.subLocation}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carSpaces">Car Spaces Available</Label>
                <Input
                  id="carSpaces"
                  name="carSpaces"
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.carSpaces}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="scooterSpaces">Scooter Spaces Available</Label>
                <Input
                  id="scooterSpaces"
                  name="scooterSpaces"
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.scooterSpaces}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerHour">Price per Hour ($)</Label>
                <Input
                  id="pricePerHour"
                  name="pricePerHour"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 5.00"
                  value={formData.pricePerHour}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactDetail">Contact Detail</Label>
                <Input
                  id="contactDetail"
                  name="contactDetail"
                  placeholder="Phone or email"
                  value={formData.contactDetail}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Map Picker */}
            <div className="space-y-2">
              <Label>Location on Map</Label>
              <div className="border rounded-lg p-4">
                <MapPicker
                  onLocationSelect={(coordinates) => {
                    setFormData({ ...formData, coordinates });
                  }}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                List Parking Space
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowListingModal(false)}
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

export default AdminDashboard;
