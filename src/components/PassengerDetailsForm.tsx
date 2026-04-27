import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Calendar as CalendarIcon, X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Button } from "./ui/button";

interface PassengerDetails {
  title: string;
  firstName: string;
  surname: string;
  dateOfBirth: string;
}

interface PassengerDetailsFormProps {
  adults: number;
  children: number;
  infants: number;
  onSubmit: (passengers: PassengerDetails[], contactEmail: string, contactPhone: string) => void;
  onClose: () => void;
}

export const PassengerDetailsForm: React.FC<PassengerDetailsFormProps> = ({
  adults,
  children,
  infants,
  onSubmit,
  onClose,
}) => {
  const totalPassengers = adults + children + infants;
  const [passengers, setPassengers] = useState<PassengerDetails[]>(
    Array(totalPassengers).fill({
      title: "",
      firstName: "",
      surname: "",
      dateOfBirth: "",
    })
  );
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const updatePassenger = (index: number, field: keyof PassengerDetails, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(passengers, contactEmail, contactPhone);
  };

  const getPassengerType = (index: number) => {
    if (index < adults) return "Adult";
    if (index < adults + children) return "Child";
    return "Infant";
  };

  const getAgeRange = (index: number) => {
    if (index < adults) return "18+ years";
    if (index < adults + children) return "2-17 years";
    return "0-2 years";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card rounded-3xl shadow-2xl border border-accent/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-primary to-primary/80 p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-['Playfair_Display'] text-primary-foreground font-bold">
                Passenger Details
              </h2>
              <p className="text-primary-foreground/80 text-sm font-['Cormorant_Garamond']">
                Use standard characters (A–Z) without accents. Match your travel document.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-foreground/10 rounded-full transition-all"
            >
              <X className="w-6 h-6 text-primary-foreground" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {passengers.map((passenger, index) => (
            <div key={index} className="border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">
                  {getPassengerType(index)} {index - (index < adults ? 0 : index < adults + children ? adults : adults + children) + 1}
                </h3>
                <span className="text-sm text-muted-foreground">({getAgeRange(index)})</span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Title *</Label>
                  <select
                    required
                    value={passenger.title}
                    onChange={(e) => updatePassenger(index, "title", e.target.value)}
                    className="w-full mt-1 p-3 border border-border rounded-xl bg-background"
                  >
                    <option value="">Select</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Miss">Miss</option>
                    <option value="Master">Master</option>
                  </select>
                </div>

                <div>
                  <Label>First name *</Label>
                  <Input
                    required
                    placeholder="e.g. John"
                    value={passenger.firstName}
                    onChange={(e) => updatePassenger(index, "firstName", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Surname *</Label>
                  <Input
                    required
                    placeholder="e.g. Smith"
                    value={passenger.surname}
                    onChange={(e) => updatePassenger(index, "surname", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Date of birth *</Label>
                <Input
                  required
                  type="date"
                  value={passenger.dateOfBirth}
                  onChange={(e) => updatePassenger(index, "dateOfBirth", e.target.value)}
                  className="mt-1 max-w-xs"
                />
              </div>
            </div>
          ))}

          {/* Contact Details */}
          <div className="border border-accent/20 rounded-2xl p-6 space-y-4 bg-accent/5">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-accent" />
              Contact Details
            </h3>
            <p className="text-sm text-muted-foreground font-['Cormorant_Garamond']">
              We'll send your booking confirmation and invoice to this email
            </p>

            <div className="space-y-4">
              <div>
                <Label>Email *</Label>
                <Input
                  required
                  type="email"
                  placeholder="your.email@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Phone number *</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value="+254"
                    disabled
                    className="w-20"
                  />
                  <Input
                    required
                    type="tel"
                    placeholder="786929964"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
            <h4 className="font-semibold mb-2 text-primary">Important Notice</h4>
            <p className="text-sm text-muted-foreground font-['Cormorant_Garamond']">
              After submitting, you'll receive a booking confirmation email with your invoice. 
              You can proceed with payment via a secure link. We'll notify you once your booking is confirmed.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full py-6 text-lg font-semibold"
          >
            Submit & Receive Invoice
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};
