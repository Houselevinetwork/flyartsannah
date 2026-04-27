import React, { useState } from "react";
import { Plane, Package, MapPin, Calendar, Users, Clock } from "lucide-react";

export default function MultiReservationSystem() {
const [type, setType] = useState("hotels");
  const [hotels, setHotels] = useState({ location: "", checkin: "", checkout: "", guests: 1, rooms: 1 });
  const [pkg, setPkg] = useState({ destination: "", start: "", end: "", style: "all" });
  const [balloon, setBalloon] = useState({ country: "", camp: "", arrive: "", depart: "", guests: 1 });
  const [heli, setHeli] = useState({ from: "", to: "", date: "", durationMins: 30, guests: 1 });
  const [charter, setCharter] = useState({ aircraft: "", from: "", to: "", date: "", passengers: 1 });
  const [drone, setDrone] = useState({ location: "", purpose: "", date: "", hours: 2 });
  const [transfer, setTransfer] = useState({ from: "", to: "", date: "", passengers: 1 });

  const emptyLegs = [
    { id: 1, from: "NBO", to: "MIA", date: "2025-09-03", price: "Ask" },
    { id: 2, from: "JNB", to: "CPT", date: "2025-09-09", price: "Ask" },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    let payload: { type: string; data?: any } = { type };
    if (type === "hotels") payload.data = hotels;
    if (type === "package") payload.data = pkg;
    if (type === "balloon") payload.data = balloon;
    if (type === "helicopter") payload.data = heli;
    if (type === "charter") payload.data = charter;
    if (type === "drone") payload.data = drone;
    if (type === "transfer") payload.data = transfer;

    console.log("Submitting booking:", payload);
    alert("Booking submitted to console (see DevTools). Replace console.log with an API call in production.");
  }

  return (
    <div className="w-full bg-gradient-to-br from-[#1B2932] via-[#2E4755] to-[#1B2932] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2E4755] mb-2">Multi-Service Reservation</h1>
            <p className="text-gray-600">Choose your experience and customize your journey</p>
          </header>

          {/* Experience selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
            {[
              { id: "hotels", label: "Hotels", icon: Package },
              { id: "package", label: "Fly-to Package", icon: Package },
              { id: "balloon", label: "Balloon Safari", icon: MapPin },
              { id: "helicopter", label: "Helicopter", icon: Plane },
              { id: "charter", label: "Charter", icon: Plane },
              { id: "drone", label: "Drone Photo", icon: Calendar },
              { id: "transfer", label: "Airport Transfer", icon: Plane },
              { id: "emptyleg", label: "Empty Legs", icon: Clock },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`p-4 rounded-xl text-sm font-medium transition-all flex flex-col items-center space-y-2 ${
                    type === t.id 
                      ? "bg-[#2E4755] text-white shadow-lg scale-105" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"
                  }`}>
                  <Icon className="w-6 h-6" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hotels form */}
            {type === "hotels" && (
              <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-[#2E4755] mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Hotel Booking
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input value={hotels.location} onChange={(e) => setHotels(h => ({...h, location: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" placeholder="City or hotel name" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <input type="date" value={hotels.checkin} onChange={(e) => setHotels(h => ({...h, checkin: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <input type="date" value={hotels.checkout} onChange={(e) => setHotels(h => ({...h, checkout: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <input type="number" min={1} value={hotels.guests} onChange={(e) => setHotels(h => ({...h, guests: Number(e.target.value)}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                    <input type="number" min={1} value={hotels.rooms} onChange={(e) => setHotels(h => ({...h, rooms: Number(e.target.value)}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>
                </div>
              </section>
            )}

            {/* Package form */}
            {type === "package" && (
              <section className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-[#2E4755] mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Travel Package
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <input value={pkg.destination} onChange={(e) => setPkg(p => ({...p, destination: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" placeholder="e.g. London, Cape Town" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="date" value={pkg.start} onChange={(e) => setPkg(p => ({...p, start: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input type="date" value={pkg.end} onChange={(e) => setPkg(p => ({...p, end: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Travel Style</label>
                    <select value={pkg.style} onChange={(e) => setPkg(p => ({...p, style: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]">
                      <option value="all">All</option>
                      <option value="budget">Budget</option>
                      <option value="mid">Mid-range</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                </div>
              </section>
            )}

            {/* Balloon Safari */}
            {type === "balloon" && (
              <section className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-[#2E4755] mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Balloon Safari
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input value={balloon.country} onChange={(e) => setBalloon(b => ({...b, country: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" placeholder="e.g. Tanzania" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Camp / Lodge</label>
                    <input value={balloon.camp} onChange={(e) => setBalloon(b => ({...b, camp: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" placeholder="Name of camp" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <input type="number" min={1} value={balloon.guests} onChange={(e) => setBalloon(b => ({...b, guests: Number(e.target.value)}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Arrival</label>
                    <input type="date" value={balloon.arrive} onChange={(e) => setBalloon(b => ({...b, arrive: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                    <input type="date" value={balloon.depart} onChange={(e) => setBalloon(b => ({...b, depart: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>
                </div>
              </section>
            )}

            {/* Airport Transfer form */}
            {type === "transfer" && (
              <section className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-[#2E4755] mb-4 flex items-center">
                  <Plane className="w-5 h-5 mr-2" />
                  Airport Transfer
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input value={transfer.from} onChange={(e) => setTransfer(t => ({...t, from: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" placeholder="Airport or address" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input value={transfer.to} onChange={(e) => setTransfer(t => ({...t, to: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" placeholder="Hotel or address" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" value={transfer.date} onChange={(e) => setTransfer(t => ({...t, date: e.target.value}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                    <input type="number" min={1} value={transfer.passengers} onChange={(e) => setTransfer(t => ({...t, passengers: Number(e.target.value)}))} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#2E4755] focus:ring-[#2E4755]" />
                  </div>
                </div>
              </section>
            )}

            {/* Empty legs */}
            {type === "emptyleg" && (
              <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-[#2E4755] mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Available Empty Legs
                </h3>
                <div className="grid gap-4">
                  {emptyLegs.map((leg) => (
                    <div key={leg.id} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                      <div>
                        <div className="font-medium text-gray-900">{leg.from} → {leg.to}</div>
                        <div className="text-sm text-gray-600">{leg.date} • {leg.price}</div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => alert(`Requesting booking for empty leg ${leg.id}`)} 
                        className="px-4 py-2 rounded-lg bg-[#2E4755] text-white hover:bg-[#1e2f3a] transition-colors"
                      >
                        Request
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="flex justify-center">
              <button 
                type="submit" 
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#B08747] to-[#9A7641] text-white font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Search / Request Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}