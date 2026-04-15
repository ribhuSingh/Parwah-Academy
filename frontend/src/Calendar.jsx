import React from 'react'

const Calendar = () => {
  const [events, setEvents] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) throw new Error('Could not load events')
        const data = await response.json()
        setEvents(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load events right now.')
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  if (loading) return <div className="text-center py-8">Loading events...</div>
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events scheduled.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              
              {/* Event Image Added Here */}
              {event.imageUrl ? (
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full aspect-[16/9] object-cover"
                />
              ) : (
                <div className="w-full aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No event image
                </div>
              )}

              {/* Event Details Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2 text-slate-900">{event.title}</h2>
                <p className="text-gray-600 mb-4 flex-grow">{event.description}</p>
                
                <div className="text-sm text-gray-500 space-y-1 pt-4 border-t border-gray-100">
                  <p>
                    <span className="font-medium text-gray-700">Date:</span>{' '}
                    {new Date(event.eventDate).toLocaleDateString(undefined, {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Location:</span> {event.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Calendar