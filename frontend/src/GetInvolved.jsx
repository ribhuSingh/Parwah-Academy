import React from 'react'

const GetInvolved = () => {
  const involvementOptions = [
    {
      icon: (
        <svg className="w-8 h-8 text-navy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Give Your Time",
      description: "Be a mentor. Be a coach. Or just be someone who shows up. Your presence could inspire a young athlete to keep going.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Support a Dream",
      description: "Every donation—big or small—helps an athlete get closer to their goal. Sponsor equipment, training, travel, or just a simple meal before a match.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
      ),
      title: "Partner With Purpose",
      description: "Are you a school, academy, or organization that believes in grassroots sports? Let's join hands and build something meaningful together.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: "Be a Voice",
      description: "Follow us. Talk about us. Share our stories. You never know who might see it—and who might be inspired.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="w-full max-w-7xl px-4 mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Get Involved – Be the Reason Someone Never Gives Up</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            At Parwah Sports Trust, we believe it takes a village to build a champion. You don't need to be an athlete to
            change the game—you just need to care.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {involvementOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-navy-700/10">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="/">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-navy-700 text-white hover:bg-navy-800 h-10 px-6 py-2 transition-colors">
                Return to Home
              </button>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GetInvolved