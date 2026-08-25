export const businessFacts = Object.freeze({
  publicName: "JVF Services",
  phoneDisplay: "(716) 748-9117",
  phoneHref: "tel:+17167489117",
  smsHref: "sms:+17167489117",
  email: null,
  address: null,
  owner: null,
  legalEntitySuffix: null,
  reviews: [] as const,
  areaServed: "Ohio",
  services: {
    housekeeping: {
      audiences: ["homes", "small offices"],
      types: [
        "standard",
        "deep",
        "recurring",
        "move-in/move-out",
        "one-time",
      ],
      excluded: ["hazardous work", "biohazard work"],
    },
    decoration: {
      scope: ["room styling", "decor selection", "arrangement", "setup"],
      licensedInteriorDesignClaim: false,
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
