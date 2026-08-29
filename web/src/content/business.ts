export const businessFacts = Object.freeze({
  publicName: "JVF Services",
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
  owner: "Jacqueline Valentin",
  legalEntitySuffix: null,
  reviews: [
    {
      id: "rebecca-hawland-cleaning",
      title: "Client",
      author: "Rebecca Hawland",
      date: "2026-03-31",
      rating: 5,
      body: [
        "“Great response time, staff was on time and got the job done pretty JVF Services. House looked great when they finished. If anyone needs a clean home contact them.”",
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
