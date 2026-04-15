import React from "react"
import Card from "./components/ui/card"

const sports = [
  "Taekwondo",
  "Athletics",
  "Volleyball",
  "Archery",
  "Skating",
  "Tennis",
  "Badminton",
]

const focusAreas = [
  {
    title: "Grassroots Sports Development",
    description:
      "Identifying and nurturing young talent at the school level through structured training programs.",
  },
  {
    title: "School Sports Programs",
    description:
      "Collaborating with schools to introduce professional coaching and regular sports activities.",
  },
  {
    title: "Athlete Performance Training",
    description:
      "Providing systematic training, fitness development, and competitive exposure for athletes.",
  },
]

const missionPoints = [
  "Promote sports participation among students",
  "Provide professional coaching and athlete development programs",
  "Support talented athletes with training, mentorship, and guidance",
]

const partnershipPoints = [
  {
    title: "Professional Coaching",
    description:
      "Students receive training from experienced coaches with competitive sports backgrounds. Our coaching methods are designed to enhance technique, discipline, and game understanding.",
  },
  {
    title: "Structured Athlete Development",
    description:
      "Programs designed to improve discipline, fitness, and sports performance. We follow a progressive training model tailored to each athlete’s age and skill level.",
  },
  {
    title: "Competitive Opportunities",
    description:
      "Students get opportunities to participate in district, state, and national-level competitions. This exposure helps them gain confidence and real-game experience.",
  },
]

export default function Organization() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="section-block">
        <div className="shell text-center max-w-3xl mx-auto">
          <p className="eyebrow">About the Organization</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-950 tracking-tight">
            Nurturing Talent, Building Futures
          </h1>
          <p className="mt-4 text-muted-foreground">
            PSCT is a sports development organization dedicated to nurturing
            young athletes and promoting a culture of discipline, health, and
            excellence through structured sports training and athlete development programs.
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section-block">
        <div className="shell grid gap-10 lg:grid-cols-2 items-start">
          <div className="section-heading text-left">
            <p className="eyebrow">Who We Are</p>
            <h2>Empowering Athletes Through Structured Development</h2>
            <p>
              PSCT – Parwah Sports Charitable Trust is a sports development organization committed to nurturing young athletes and promoting a culture of discipline, health, and excellence through structured sports training and athlete development programs.
            </p>
            <p className="mt-4">
              The organization works closely with schools, communities, and sports professionals to provide students with opportunities to participate in Olympic and professional sports while developing physical fitness, confidence, and leadership qualities.
            </p>
            <p className="mt-4">
              Understanding that athlete health and safety are essential for performance, the organization also promotes basic medical support and injury awareness for athletes, helping them train safely and recover properly when needed.
            </p>
            <p className="mt-4">
              Our mission is to identify talented athletes from the grassroots level and provide them with the guidance, training, and exposure needed to reach district, state, national, and international competitions.
            </p>
            <p className="mt-4">
              Through partnerships with schools, coaches, and sports organizations, PSCT aims to build a strong sporting ecosystem that supports athletes not only in sports performance but also in their personal growth and education.
            </p>
          </div>

          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              Sports We Focus On
            </h3>
            <p className="text-sm text-muted-foreground">
              We provide training across multiple sports disciplines to help
              students explore their strengths and interests.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {sports.map((sport) => (
                <div
                  key={sport}
                  className="bg-slate-100 rounded-md px-3 py-2 text-sm font-medium text-center"
                >
                  {sport}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="section-block section-contrast">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Key Focus Areas</p>
            <h2>Where We Create Impact</h2>
            <p>
              Our initiatives are designed to support athletes at every stage —
              from early discovery to competitive excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {focusAreas.map((item) => (
              <Card key={item.title} className="p-6 space-y-3">
                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="section-block">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <Card className="p-6 space-y-3">
            <p className="eyebrow">Vision</p>
            <h2 className="text-2xl font-semibold">
              Building a Strong Sporting Culture
            </h2>
            <p className="text-muted-foreground">
              To build a strong sporting culture in India by developing talented
              athletes and providing them with opportunities to compete at
              national and international levels.
            </p>
            <p className="text-muted-foreground text-sm">
              We aim to create an ecosystem where sports is seen as a viable and
              respected career path for young individuals.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <p className="eyebrow">Mission</p>
            <h2 className="text-2xl font-semibold">
              Supporting Athletes at Every Step
            </h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              {missionPoints.map((point, index) => (
                <li key={index}>• {point}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* PARTNERSHIP SECTION */}
      <section className="section-block section-contrast">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">School Partnerships</p>
            <h2>Why schools should partner with PSCT</h2>
            <p>
              We collaborate with institutions to build strong sports programs
              that benefit students both athletically and personally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {partnershipPoints.map((item) => (
              <Card key={item.title} className="p-6 space-y-3">
                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}