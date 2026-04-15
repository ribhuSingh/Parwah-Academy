import React from 'react'

const GetInvolved = () => {
  const involvementOptions = [
    {
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      title: "Partner with Us – Schools & Institutions",
      description: "Schools can collaborate with PSCT to introduce structured sports programs, professional coaching, and science-based training methods for students. Together we can build a strong foundation where children learn discipline, teamwork, and confidence through sports.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Join as an Athlete",
      description: "If you are passionate about sports and want to improve your skills, PSCT provides guidance, training, and opportunities to help young athletes grow and compete at district, state, national, and international levels.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-navy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Volunteer with Us",
      description: "Volunteers play an important role in building strong sports communities. By contributing your time, knowledge, and passion, you can help inspire young athletes and support sports programs in schools and rural areas.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: "Collaborate as a Coach",
      description: "PSCT welcomes certified coaches and sports professionals who are passionate about developing young athletes and promoting scientific sports training methods.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Support Our Mission",
      description: "By supporting PSCT, you help provide training, equipment, guidance, and opportunities for talented athletes, especially those coming from rural backgrounds who dream of representing their state and country.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="w-full max-w-7xl px-4 mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Get Involved</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            At PSCT – Parwah Sports Charitable Trust, we believe that every child deserves an opportunity to discover their potential through sports. Our mission cannot be achieved alone — it requires the support of people who believe in the power of sports to change lives.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
        </div>
      </main>
    </div>
  )
}

export default GetInvolved