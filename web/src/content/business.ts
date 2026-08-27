export const businessFacts = Object.freeze({
  publicName: "JVF HomeWorks Pro",
  phoneDisplay: "(716) 748-9117",
  phoneHref: "tel:+17167489117",
  smsHref: "sms:+17167489117",
  email: "services.jvf@gmail.com",
  emailHref: "mailto:services.jvf@gmail.com",
  mailingAddress: {
    street: "2590 Walnut St",
    city: "Denver",
    region: "CO",
    postalCode: "80205",
    formatted: "2590 Walnut St, Denver, CO 80205",
  },
  owner: null,
  legalEntitySuffix: null,
  reviews: [
    {
      id: "hellen-smith-basement-remodel",
      title: "Basement remodel",
      author: "Hellen Smith",
      date: "2026-05-18",
      rating: 5,
      body: [
        "I recently had my basement remodeled by JVF HomeWorks, and I couldn’t be happier with the results. From the very beginning, they truly listened to my ideas and made me feel like my vision mattered. Their attention to detail, professionalism, and quality of work exceeded my expectations.",
        "The entire team was amazing to work with, and the finished project turned out beautifully. The owner was especially professional, polite, understanding, and genuinely passionate about delivering great service. Their kindness and dedication made the whole experience even better.",
        "I am extremely grateful for all their hard work and highly recommend JVF HomeWorks 100%. I will definitely be contacting them again for future projects. Thank you so much!",
      ],
    },
    {
      id: "rebecca-hawland-cleaning",
      title: "Client",
      author: "Rebecca Hawland",
      date: "2026-03-31",
      rating: 5,
      body: [
        "“Great response time, staff was on time and got the job done pretty JVF Home works Pro. House looked great when they finished. If anyone needs a clean home contact them.”",
      ],
    },
    {
      id: "michelle-cleaning",
      title: "Client",
      author: "Michelle",
      date: "2026-03-31",
      rating: 4,
      body: [
        "Amazed with their work. The house looked spectacular. Got the job well done; very well cleaned. Definitely recommended will keep using their services!",
      ],
    },
  ] as const,
  areaServed: "Ohio",
  services: {
    housekeeping: {
      audiences: ["homes", "small offices"],
      types: ["standard", "deep", "recurring", "move-in/move-out", "one-time"],
      excluded: ["hazardous work", "biohazard work"],
      hourlyRate: 39,
    },
    remodeling: {
      hourlyRate: 59,
      scope: [
        "kitchen and bathroom upgrades",
        "flooring",
        "painting",
        "fixtures",
      ],
    },
    decoration: {
      scope: ["room styling", "decor selection", "arrangement", "setup"],
      licensedInteriorDesignClaim: false,
      hourlyRate: 59,
    },
    notary: {
      credential: "Ohio-commissioned Notary Public",
      mode: "in-person",
      appointmentRequired: true,
      pricePerAct: 5,
      travelFeeQuotedInAdvance: true,
      remoteOnlineNotarization: false,
    },
    interpreting: {
      languages: ["Spanish", "English"],
      certifiedClaim: false,
      inPersonHoursEastern: { start: "08:00", end: "18:00" },
      virtualAvailability: "24/7",
      modes: ["phone", "Zoom", "virtual"],
    },
  },
});
