import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TripInquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trip: { title: string; days: string } | null;
}

const TripInquiryDialog = ({ isOpen, onClose, trip }: TripInquiryDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "",
    date: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inquiry submitted! We'll contact you soon.");
    onClose();
    setFormData({
      name: "",
      email: "",
      phone: "",
      travelers: "",
      date: "",
      message: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-light text-foreground">Trip Inquiry</h2>
            {trip && (
              <p className="text-sm text-muted-foreground mt-1">
                {trip.title} - {trip.days}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Number of Travelers
              </label>
              <input
                type="number"
                min="1"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Preferred Travel Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Information
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Tell us about your travel preferences, special requirements, or any questions..."
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-border text-foreground rounded-md hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripInquiryDialog;