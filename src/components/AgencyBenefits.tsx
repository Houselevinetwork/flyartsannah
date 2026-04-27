import React from "react";
import { motion } from "framer-motion";
import { Shield, HeadphonesIcon, Clock, Award, CheckCircle2, Sparkles } from "lucide-react";

export const AgencyBenefits: React.FC = () => {
  const benefits = [
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Personalized service and expert guidance for complex itineraries. Our team handles all the details.",
    },
    {
      icon: Shield,
      title: "Travel Advocacy",
      description: "When things go wrong (cancellations, delays), we're your personal advocate to rebook and resolve issues.",
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "We research options, compare prices, and manage bookings so you can focus on what matters.",
    },
    {
      icon: Award,
      title: "Exclusive Access",
      description: "Special fares, upgrades, and value-added amenities through our airline relationships.",
    },
    {
      icon: CheckCircle2,
      title: "Accuracy Guaranteed",
      description: "We verify all details to avoid mistakes with dates, names, baggage policies, or visa requirements.",
    },
    {
      icon: Sparkles,
      title: "Complex Itineraries",
      description: "Multi-destination travel, different airlines, specialty bookings - we handle it all seamlessly.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/10"
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-['Playfair_Display'] font-bold mb-3">
          Why Book with Fly ArtSannah?
        </h3>
        <p className="text-lg text-muted-foreground font-['Cormorant_Garamond'] max-w-2xl mx-auto">
          Experience the difference of personalized travel service. While direct booking may seem cheaper, 
          the real value lies in our expertise and support when you need it most.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border hover:border-accent/50 transition-all hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4">
              <benefit.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h4 className="font-semibold text-lg mb-2">{benefit.title}</h4>
            <p className="text-sm text-muted-foreground font-['Cormorant_Garamond'] leading-relaxed">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground font-['Cormorant_Garamond'] italic">
          Our 20% service fee ensures you receive premium support throughout your entire journey
        </p>
      </div>
    </motion.div>
  );
};
