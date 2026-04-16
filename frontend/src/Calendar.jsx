import React, { useState, useEffect } from 'react';
import Card from './components/ui/card';
import Button from './components/ui/button';
import RegistrationModal from './components/RegistrationModal'; // Import the modal

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); // State for the selected event

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <main className="shell py-12 md:py-20">
      <div className="section-heading">
        <p className="eyebrow">Calendar</p>
        <h2>Upcoming Events</h2>
        <p className="max-w-2xl">Join us for our upcoming workshops, competitions, and community gatherings. Register below to secure your spot.</p>
      </div>
      
      {loading && <p className="text-center text-slate-600">Loading events...</p>}
      {error && <p className="text-center text-rose-600">{error}</p>}

      {!loading && events.length === 0 && !error && (
        <p className="text-center text-slate-600">There are no upcoming events at this time. Please check back later!</p>
      )}

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <Card key={event.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="aspect-[16/9] w-full object-cover" />}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
              <p className="mt-1 text-sm font-medium text-slate-500">{new Date(event.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} &bull; {event.location}</p>
              <p className="mt-3 flex-1 text-slate-600">{event.description}</p>
              <div className="mt-6">
                <Button onClick={() => handleRegisterClick(event)} className="w-full">
                  Register for this Event
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedEvent && (
        <RegistrationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </main>
  );
}