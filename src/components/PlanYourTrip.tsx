import { useState } from "react";
import { toast } from "sonner";
import { Calendar, Users, Mail, Phone, MessageSquare } from "lucide-react";

const PlanYourTrip = ({ countryName }: { countryName: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "",
    budget: "",
    duration: "",
    date: "",
    interests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Trip planning request submitted! We'll contact you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      travelers: "",
      budget: "",
      duration: "",
      date: "",
      interests: "",
      message: "",
    });
  };

  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            Plan Your Trip to {countryName}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-light max-w-2xl mx-auto">
            Let our travel experts design your perfect {countryName} adventure tailored to your preferences
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-muted/20 p-6 md:p-8 rounded-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Number of Travelers */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Number of Travelers *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="2"
              />
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Preferred Travel Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Trip Duration (days)
              </label>
              <input
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="7"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Budget per Person (USD)
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="">Select budget range</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500-5000">$2,500 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000+">$10,000+</option>
              </select>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Travel Interests
              </label>
              <select
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="">Select primary interest</option>
                <option value="wildlife">Wildlife Safari</option>
                <option value="beach">Beach & Relaxation</option>
                <option value="adventure">Adventure & Trekking</option>
                <option value="culture">Cultural Experiences</option>
                <option value="luxury">Luxury Travel</option>
                <option value="honeymoon">Honeymoon</option>
                <option value="family">Family Vacation</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Additional Information
            </label>
            <textarea
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-white"
              placeholder="Tell us about your dream trip, special requirements, dietary restrictions, or any questions you have..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-8 py-4 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wide rounded-md hover:bg-primary/90 transition-colors shadow-md"
            >
              Submit Trip Request
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to be contacted by our travel team regarding your inquiry.
          </p>
        </form>
      </div>
    </section>
  );
};

export default PlanYourTrip;