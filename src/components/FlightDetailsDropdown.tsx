import { Clock, Plane } from "lucide-react";
import { getAirlineName } from "@/lib/airline-names";

interface Segment {
  departure: { iataCode: string; at: string };
  arrival: { iataCode: string; at: string };
  carrierCode: string;
  number: string;
  aircraft?: { code: string };
  duration?: string;
}

interface FlightDetailsDropdownProps {
  segments: Segment[];
}

export default function FlightDetailsDropdown({ segments }: FlightDetailsDropdownProps) {
  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="border-t border-border bg-muted/30 p-4 animate-slide-down">
      <div className="space-y-4">
        {segments.map((segment, idx) => (
          <div key={idx}>
            {idx > 0 && (
              <div className="flex items-center gap-2 my-3 text-xs text-muted-foreground">
                <div className="h-px bg-border flex-1" />
                <Clock className="w-3 h-3" />
                <span>Connection time in {segments[idx - 1].arrival.iataCode}</span>
                <div className="h-px bg-border flex-1" />
              </div>
            )}
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-start">
              <div className="text-right">
                <div className="text-lg font-bold">{formatTime(segment.departure.at)}</div>
                <div className="text-xs text-muted-foreground">
                  {segment.departure.iataCode}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(segment.departure.at)}
                </div>
              </div>

              <div className="flex flex-col items-center py-2">
                <Plane className="w-4 h-4 text-accent mb-1" />
                <div className="text-xs text-center text-muted-foreground">
                  <div>{getAirlineName(segment.carrierCode)}</div>
                  <div>
                    {segment.carrierCode} {segment.number}
                  </div>
                  {segment.aircraft?.code && (
                    <div className="mt-1">Aircraft: {segment.aircraft.code}</div>
                  )}
                </div>
              </div>

              <div className="text-left">
                <div className="text-lg font-bold">{formatTime(segment.arrival.at)}</div>
                <div className="text-xs text-muted-foreground">{segment.arrival.iataCode}</div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(segment.arrival.at)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
