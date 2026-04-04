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
            <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="text-sm text-gray-500">
                <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Calendar