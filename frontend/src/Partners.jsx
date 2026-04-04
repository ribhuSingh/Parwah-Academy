import React from 'react'

const Partners = () => {
  const [partners, setPartners] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    async function loadPartners() {
      try {
        const response = await fetch('/api/partners')
        if (!response.ok) throw new Error('Could not load partners')
        const data = await response.json()
        setPartners(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load partners right now.')
      } finally {
        setLoading(false)
      }
    }

    loadPartners()
  }, [])

  const fallbackPartners = [
    {
      id: 1,
      name: "Global Sports Equipment",
      category: "Equipment Supplier",
      description: "Leading provider of high-quality sports equipment for professional athletes and teams worldwide.",
      logo: "/assets/E1.jpeg",
      website: "#",
      featured: true,
    },
    {
      id: 2,
      name: "Health First Medical",
      category: "Healthcare Partner",
      description:
        "Specialized medical services for athletes, focusing on sports medicine, injury prevention, and rehabilitation.",
      logo: "/assets/E2.jpeg",
      website: "#",
      featured: true,
    },    {
      id: 3,
      name: "City Marathon Organizers",
      category: "Event Organizer",
      description:
        "Organizers of the annual city marathon, hosting thousands of runners from around the world.",
      logo: "/assets/E3.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 4,
      name: "National Basketball League",
      category: "Sports League",
      description:
        "Official governing body for professional basketball leagues, promoting national tournaments and youth development.",
      logo: "/assets/E4.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 5,
      name: "International Swimming Association",
      category: "Event Sponsor",
      description:
        "Supports swimming competitions worldwide and provides training camps for elite swimmers.",
      logo: "/assets/E5.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 6,
      name: "Pro Cycling Tours",
      category: "Event Management",
      description:
        "Management and promotion of professional cycling tours across multiple countries, focusing on competitive racing.",
      logo: "/assets/E6.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 7,
      name: "Taekwondo Championship 2025",
      category: "Sports League",
      description:
        "The Taekwondo Championship 2025 is organized by Parwah Sports Trust, bringing together athletes to showcase skill, discipline, and sportsmanship in one of the most dynamic martial arts competitions.",
      logo: "/assets/P1.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 8,
      name: "Taekwondo Championship 2025",
      category: "Sports League",
      description:
        "The Taekwondo Championship 2025 is organized by Parwah Sports Trust, bringing together athletes to showcase skill, discipline, and sportsmanship in one of the most dynamic martial arts competitions.",
      logo: "/assets/P2.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 9,
      name: "Taekwondo Championship 2025",
      category: "Sports League",
      description:
        "The Taekwondo Championship 2025 is organized by Parwah Sports Trust, bringing together athletes to showcase skill, discipline, and sportsmanship in one of the most dynamic martial arts competitions.",
      logo: "/assets/P3.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 10,
      name: "Taekwondo Championship 2025",
      category: "Sports League",
      description:
        "The Taekwondo Championship 2025 is organized by Parwah Sports Trust, bringing together athletes to showcase skill, discipline, and sportsmanship in one of the most dynamic martial arts competitions.",
      logo: "/assets/P4.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 11,
      name: "Taekwondo Championship 2025",
      category: "Sports League",
      description:
        "The Taekwondo Championship 2025 is organized by Parwah Sports Trust, bringing together athletes to showcase skill, discipline, and sportsmanship in one of the most dynamic martial arts competitions.",
      logo: "/assets/P5.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 12,
      name: "Taekwondo Championship 2025",
      category: "Sports League",
      description:
        "The Taekwondo Championship 2025 is organized by Parwah Sports Trust, bringing together athletes to showcase skill, discipline, and sportsmanship in one of the most dynamic martial arts competitions.",
      logo: "/assets/P6.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 13,
      name: "Taekwondo Championship 2025",
      category: "Sports League",
      description:
        "The Taekwondo Championship 2025 is organized by Parwah Sports Trust, bringing together athletes to showcase skill, discipline, and sportsmanship in one of the most dynamic martial arts competitions.",
      logo: "/assets/P7.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 14,
      name: "Taekwondo Championship 2025",
      category: "Sports League",
      description:
        "The Taekwondo Championship 2025 is organized by Parwah Sports Trust, bringing together athletes to showcase skill, discipline, and sportsmanship in one of the most dynamic martial arts competitions.",
      logo: "/assets/P8.jpeg",
      website: "#",
      featured: false,
    },
    {
      id: 15,
      name: "Taekwondo Championship 2025",
      category: "Sports League",
      description:
        "The Taekwondo Championship 2025 is organized by Parwah Sports Trust, bringing together athletes to showcase skill, discipline, and sportsmanship in one of the most dynamic martial arts competitions.",
      logo: "/assets/P9.jpeg",
      website: "#",
      featured: false,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-gradient-to-b from-navy-700 to-blue-800 text-white py-16 md:py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold tracking-tight mb-6">Image Gallery</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              A showcase of our partners and contributors who help us achieve greatness in the world of sports.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 relative inline-block">
              Unleashing Passion, Showcasing Glory! 🏆📸
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gold-400"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loading && <p className="text-center text-slate-500">Loading partners...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {(partners.length ? partners : fallbackPartners).map((partner, index) => (
                <div
                  key={partner.id}
                  className="bg-white border rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center"
                >
                  <div className="h-48 w-full relative">
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col items-center">
                    <span className="bg-navy-700/10 text-navy-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {partner.category}
                    </span>
                    <h2 className="text-xl font-bold mb-2">{partner.name}</h2>
                    <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Partners