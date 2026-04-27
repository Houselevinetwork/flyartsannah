import { LucideIcon } from "lucide-react";

interface AttractionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

const AttractionCard = ({ icon: Icon, title, subtitle }: AttractionCardProps) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 p-6">
      <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-secondary" />
      </div>
      <h3 className="text-foreground text-xs font-bold uppercase tracking-wider leading-snug">
        {title}
      </h3>
      <p className="text-muted-foreground text-xs font-light">
        {subtitle}
      </p>
    </div>
  );
};

export default AttractionCard;
