import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns";

interface LuxuryCalendarProps {
  departureDate: Date | null;
  returnDate: Date | null;
  onDepartureSelect: (date: Date) => void;
  onReturnSelect: (date: Date) => void;
  tripType: "oneway" | "roundtrip" | "multicity";
  onClose: () => void;
}

export const LuxuryCalendar: React.FC<LuxuryCalendarProps> = ({
  departureDate,
  returnDate,
  onDepartureSelect,
  onReturnSelect,
  tripType,
  onClose,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingDeparture, setSelectingDeparture] = useState(!departureDate);
  const [posStyle, setPosStyle] = useState<React.CSSProperties>();

  const today = startOfDay(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOfWeek = monthStart.getDay();

  // Compute placement below header & match hero search width
  useLayoutEffect(() => {
    function computePosition() {
      try {
        const headerEl = document.querySelector("header");
        const heroSearchEl = document.querySelector("#hero-search");
        const headerRect = headerEl?.getBoundingClientRect();
        const heroRect = heroSearchEl?.getBoundingClientRect();

        const safeTop = (headerRect?.bottom ?? 0) + 14; // distance under header

        if (heroRect) {
          // align perfectly with hero search card
          setPosStyle({
            position: "fixed",
            top: `${safeTop}px`,
            left: `${heroRect.left}px`,
            width: `${heroRect.width}px`,
            maxWidth: "640px", // smaller, refined rectangular width
            zIndex: 2000,
          });
        } else {
          // fallback: center align
          const vw = window.innerWidth;
          const width = Math.min(640, vw - 32);
          setPosStyle({
            position: "fixed",
            top: `${safeTop}px`,
            left: `${(vw - width) / 2}px`,
            width: `${width}px`,
            zIndex: 2000,
          });
        }
      } catch {
        // fallback default
        setPosStyle({
          position: "fixed",
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "640px",
          zIndex: 2000,
        });
      }
    }

    computePosition();
    window.addEventListener("resize", computePosition);
    window.addEventListener("scroll", computePosition);
    return () => {
      window.removeEventListener("resize", computePosition);
      window.removeEventListener("scroll", computePosition);
    };
  }, []);

  const handleDateClick = (date: Date) => {
    if (isBefore(date, today)) return;

    if (selectingDeparture || tripType === "oneway" || tripType === "multicity") {
      onDepartureSelect(date);
      if (tripType === "roundtrip") setSelectingDeparture(false);
      else onClose();
    } else {
      if (departureDate && isBefore(date, departureDate)) return;
      onReturnSelect(date);
      onClose();
    }
  };

  const isDayDisabled = (date: Date) =>
    isBefore(date, today) ||
    (!selectingDeparture && departureDate && isBefore(date, departureDate));

  const isDaySelected = (date: Date) =>
    (selectingDeparture && departureDate && isSameDay(date, departureDate)) ||
    (!selectingDeparture && returnDate && isSameDay(date, returnDate));

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      style={posStyle}
      className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-2xl"
      aria-modal="true"
      role="dialog"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#001F3F] to-[#013A63] px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-white text-base sm:text-lg font-semibold">
            {selectingDeparture
              ? "Select Departure Date"
              : "Select Return Date"}
          </h2>
          <p className="text-white/70 text-xs sm:text-sm">
            {selectingDeparture
              ? "Choose your travel start date"
              : "Choose your return date"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-transform hover:rotate-90 duration-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-200 rounded-md"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h3 className="font-medium text-gray-800 text-sm sm:text-base">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-200 rounded-md"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        <div className="grid grid-cols-7 text-center text-[10px] sm:text-xs font-semibold text-gray-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {daysInMonth.map((date) => {
            const disabled = isDayDisabled(date);
            const selected = isDaySelected(date);
            const isToday = isSameDay(date, today);

            return (
              <motion.button
                key={date.toString()}
                onClick={() => !disabled && handleDateClick(date)}
                disabled={disabled}
                whileHover={!disabled ? { scale: 1.04 } : {}}
                whileTap={!disabled ? { scale: 0.96 } : {}}
                className={`h-9 sm:h-10 rounded-md flex items-center justify-center text-xs sm:text-sm transition-all
                  ${
                    disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-blue-50 cursor-pointer"
                  }
                  ${
                    selected
                      ? "bg-blue-900 text-white font-semibold shadow-md"
                      : "bg-white border border-gray-100"
                  }
                  ${isToday && !selected ? "ring-1 ring-blue-300" : ""}
                `}
              >
                {format(date, "d")}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs sm:text-sm text-gray-700">
        <div>
          {departureDate && (
            <span>
              Departure:{" "}
              <strong>{format(departureDate, "MMM dd")}</strong>
            </span>
          )}
          {returnDate && tripType === "roundtrip" && (
            <span className="ml-3">
              Return: <strong>{format(returnDate, "MMM dd")}</strong>
            </span>
          )}
        </div>

        {tripType === "roundtrip" && departureDate && !selectingDeparture && (
          <button
            onClick={() => setSelectingDeparture(true)}
            className="text-blue-800 hover:text-blue-600 font-medium"
          >
            Change Departure
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default LuxuryCalendar;
