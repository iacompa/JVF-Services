import type { SiteContent } from "./types";

export const en = {
  locale: "en",
  reviewStatus: "approved",
  nav: {
    home: "Home",
    services: "Services",
    gallery: "Gallery",
    about: "About",
    contact: "Contact",
    homeServices: "Home services",
    professionalServices: "Professional services",
    requestQuote: "Request Service",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    language: "Language",
    skipToContent: "Skip to main content",
  },
  common: {
    call: "Call (716) 748-9117",
    text: "Text us",
    learnMore: "Learn more",
    requestQuote: "Request Service",
    availableInOhio: "Serving Ohio inquiries case by case",
    terms: "Terms",
    privacy: "Privacy",
    accessibility: "Accessibility",
    footerSummary:
      "Thoughtful home and professional services, coordinated with clear communication.",
    rights: "All rights reserved.",
  },
  home: {
    eyebrow: "Home care & bilingual professional support",
    title: "Reliable Home Services. One Trusted Team.",
    summary:
      "JVF Services delivers professional, detail-focused home services plus notary and Spanish-English interpreting support. We make requesting service simple and expectations clear.",
    primaryCta: "Request Service",
    secondaryCta: "Book a Consultation",
    availabilityTitle: "Interpretation when you need it",
    availabilityBody:
      "Phone and virtual Spanish-English interpreting is available 24/7. In-person interpreting is available from 8:00 a.m. to 6:00 p.m. Eastern Time; after 6:00 p.m., service is virtual only.",
    servicesHeading: "Popular Services by JVF Services",
    servicesIntro:
      "Choose the service that fits your need. Every request is reviewed personally for availability, travel, and scope.",
    whyHeading: "Care that feels clear from the start",
    whyItems: [
      "Attentive, respectful service",
      "Straightforward scope and pricing",
      "Flexible phone, text, and virtual coordination",
      "English and Spanish support",
    ],
    closingTitle: "Tell us what would make life feel easier.",
    closingBody:
      "Share a few practical details and JVF Services will follow up to confirm the right next step.",
    stepsHeading: "Professional service in three simple steps",
    steps: [
      {
        number: "01",
        title: "Request a consultation",
        body: "Call, text, or use the accessible request form to tell us what you need.",
      },
      {
        number: "02",
        title: "Confirm your service",
        body: "We review the scope, timing, location, and price with you before work begins.",
      },
      {
        number: "03",
        title: "We get to work",
        body: "Your service is completed with attentive care and clear communication.",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Practical support, thoughtfully delivered.",
    intro:
      "From a refreshed home to an urgent interpreting request, JVF Services offers responsive help with clear expectations and personal coordination.",
    homeGroup: "Home services",
    professionalGroup: "Professional services",
  },
  serviceDetails: {
    housekeeping: {
      eyebrow: "Home services",
      title: "Housekeeping for homes and small offices",
      summary:
        "A cleaner, calmer space shaped around your schedule and priorities.",
      intro:
        "Request standard, deep, recurring, move-in or move-out, or one-time cleaning. We review every Ohio inquiry case by case and confirm the scope before service.",
      features: [
        "Standard and deep cleaning",
        "Recurring or one-time visits",
        "Move-in and move-out cleaning",
        "Homes and small offices",
      ],
      scheduleTitle: "A plan that fits your space",
      scheduleBody:
        "Tell us whether the space is a home or small office, the cleaning type, frequency, preferred date, and a few basic size details.",
      price: "From $39 per hour",
      cardPrice: "$39 per hour",
      note: "Final time and price depend on the confirmed scope. Hazardous and biohazard work is not offered.",
      cta: "Request Service",
    },
    decoration: {
      eyebrow: "Home services",
      title: "Home decoration and room styling",
      summary:
        "Warm, practical styling support that helps a room feel finished and personal.",
      intro:
        "JVF Services can help with residential decor selection, arrangement, room styling, and setup. Describe the room and the feeling you want to create, and we will discuss what is practical.",
      features: [
        "Room styling and finishing touches",
        "Decor selection support",
        "Furniture and accessory arrangement",
        "Hands-on room setup",
      ],
      scheduleTitle: "Start with the room and your goal",
      scheduleBody:
        "Share which rooms need attention, what you would like to change, and your preferred timing. No budget is required in the initial request.",
      price: "From $59 per hour",
      cardPrice: "$59 per hour",
      note: "Final price is confirmed after consultation. This is decoration and styling support, not licensed interior-design service.",
      cta: "Request Service",
    },
    notary: {
      eyebrow: "Professional services",
      title: "In-person Ohio notary service",
      summary:
        "Appointment-based notary support with simple, upfront fee information.",
      intro:
        "Service is provided by an Ohio-commissioned Notary Public, in person and by confirmed appointment. Requests may be sent at any time and are confirmed personally.",
      features: [
        "In-person service only",
        "Confirmed appointment required",
        "Signer appears with acceptable identification",
        "Mobile travel considered by request",
      ],
      scheduleTitle: "Before your appointment",
      scheduleBody:
        "The signer must appear in person with acceptable identification. JVF Services does not provide legal advice or choose the notarial act for a customer.",
      price:
        "$5 per in-person notarial act; any mobile travel fee is quoted and agreed in advance.",
      cardPrice: "$5 per act",
      note: "Remote online notarization is not offered.",
      cta: "Request Service",
    },
    interpreting: {
      eyebrow: "Professional services",
      title: "Spanish-English interpreting",
      summary:
        "Responsive communication support by phone, Zoom, virtual meeting, or in person.",
      intro:
        "Professional Spanish-English interpreting may be considered for any setting by request, depending on suitability and availability.",
      features: [
        "Spanish to English and English to Spanish",
        "Phone, Zoom, and other virtual meetings",
        "In-person requests during daytime hours",
        "Urgent callback requests",
      ],
      scheduleTitle: "24/7 virtual availability",
      scheduleBody:
        "Phone and virtual interpreting is available 24/7. In-person interpreting is available from 8:00 a.m. to 6:00 p.m. Eastern Time. After 6:00 p.m., requests must be by phone or virtual meeting.",
      price: "Pricing confirmed after request review",
      cardPrice: "Custom pricing",
      note: "If the line is busy or unanswered, text (716) 748-9117 or submit an urgent callback request.",
      cta: "Request Service",
    },
  },
  about: {
    eyebrow: "About JVF Services",
    title: "A service business built around care, clarity, and follow-through.",
    intro:
      "JVF Services supports Ohio households, small offices, and customers who need attentive home or bilingual professional services.",
    missionTitle: "Making practical help feel more personal",
    missionBody:
      "Our goal is simple: listen carefully, set clear expectations, and provide thoughtful service that respects your time, space, and privacy.",
    valuesHeading: "What guides the work",
    values: [
      {
        title: "Care in the details",
        body: "Every request begins with listening and a clear understanding of the desired result.",
      },
      {
        title: "Honest communication",
        body: "Scope, timing, availability, and fees are confirmed before work begins.",
      },
      {
        title: "Respect for privacy",
        body: "Only practical, non-sensitive details are requested through this website.",
      },
    ],
    founderEyebrow: "A word from the founder",
    founderRole: "Founder",
    founderStatement:
      "I take pride in bringing clarity and care to every conversation I interpret. My goal is to help people truly understand each other—always showing up with professionalism, empathy, and dedication. Communication is more than words; it’s about connection, and that’s what I focus on every time I work.",
    founderImageAlt:
      "Jacqueline Valentin, founder of JVF Services, wearing a navy blazer near a sunlit window",
  },
  gallery: {
    eyebrow: "Service portfolio",
    title: "Real work deserves an honest presentation.",
    intro:
      "Our service portfolio is being refreshed with current housekeeping, home decoration, interpreting, and notary work.",
    firstCaption: "Housekeeping and home decoration work",
    secondCaption: "Professional interpreting and notary support",
  },
  contact: {
    eyebrow: "Request service",
    title: "Let’s find the right next step.",
    intro:
      "Choose a service and share a few practical details. Your request will be reviewed personally before any appointment or price is confirmed.",
    directTitle: "Prefer to speak directly?",
    directBody:
      "Call or text (716) 748-9117. For interpreting after 6:00 p.m. Eastern Time, phone and virtual meetings remain available.",
    formTitle: "Request service",
    privacyNote:
      "Do not submit documents, identification numbers, medical records, or confidential legal details.",
  },
  book: {
    eyebrow: "15-minute phone consultation",
    title: "Book a Consultation",
    intro:
      "Choose a convenient time for a short phone conversation about your service needs, timing, and next steps.",
    durationLabel: "Consultation duration: 15 minutes",
    minutes: "minutes",
    consultationTitle: "A clear first conversation",
    consultationBody:
      "This consultation is for discussing your request. It does not confirm an appointment, final price, or service availability.",
    consultationPoints: [
      "Discuss the service and practical scope",
      "Review timing, location, and availability",
      "Understand the next step before committing",
    ],
    calendarLabel: "Google Calendar",
    calendarTitle: "Choose an available time",
    calendarBody:
      "The secure Google scheduling page opens in the same browser. Your appointment will be added to the JVF Services calendar after you finish booking.",
    openCalendar: "Open booking calendar",
    fallbackLabel: "Booking setup in progress",
    fallbackTitle: "Schedule directly for now",
    fallbackBody:
      "The online calendar is being connected. Call or text and we will help you choose a consultation time.",
    requestInstead: "Request Service instead",
  },
  legal: {
    lastUpdated: "Last updated August 25, 2026",
    officialNotaryResource: "Official Ohio notary information",
    terms: {
      title: "Terms and conditions",
      status: "Draft for review — not yet published",
      introduction:
        "These concept terms explain how the JVF Services website and request process are intended to work. They require legal review before this website is published.",
      sections: [
        {
          title: "Website purpose",
          paragraphs: [
            "This website provides general information about JVF Services and lets a visitor request a quote. Website content is informational and is not a binding offer, professional advice, or a guarantee that a service is available.",
          ],
        },
        {
          title: "Quotes and service confirmation",
          paragraphs: [
            "Submitting a request does not create an appointment or service agreement. Scope, price, travel fees, timing, location, and availability must be confirmed directly by JVF Services before work begins.",
            "A personalized quote may change if the requested scope or information changes. Customers are responsible for providing accurate, non-sensitive details needed to evaluate the request.",
          ],
        },
        {
          title: "Home services",
          paragraphs: [
            "Published starting rates are $39 per hour for housekeeping and $59 per hour for home decoration. Final scope, hours, materials, equipment, travel, and total price must be confirmed before work begins.",
            "Housekeeping is intended for homes and small offices and does not include hazardous or biohazard work. Decoration covers styling, selection, arrangement, and setup; it is not licensed interior-design service.",
          ],
        },
        {
          title: "Notary service",
          paragraphs: [
            "Notary service is offered by appointment and in person only. The signer must personally appear with acceptable identification and must be willing and able to sign. JVF Services does not offer remote online notarization and does not provide legal advice or choose documents for a customer.",
            "The stated fee is $5 per in-person notarial act. Any reasonable mobile travel fee will be quoted and agreed before the notarial act. A notarization may be declined when legal or identification requirements are not met.",
          ],
        },
        {
          title: "Interpreting service",
          paragraphs: [
            "Spanish–English interpreting is a professional communication service and is not represented as certified or sworn interpreting. In-person availability is 8:00 a.m.–6:00 p.m. Eastern Time. Phone, Zoom, and other virtual interpreting may be requested 24/7, including after 6:00 p.m.",
            "An interpreting request is not legal, medical, or financial advice. For an emergency, contact the appropriate emergency service rather than relying on this website.",
          ],
        },
        {
          title: "Payments and cancellations",
          paragraphs: [
            "This website does not accept payments or create customer accounts. A calendar consultation is only a conversation and does not confirm a service appointment. Payment method, cancellation expectations, and any travel charge will be confirmed directly before service.",
          ],
        },
        {
          title: "Ohio law and review",
          paragraphs: [
            "These draft terms are intended to be governed by the applicable laws of Ohio. They are not legal advice and must be reviewed for the business’s final entity, operating location, insurance, and service practices before publication.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy notice",
      status: "Draft for review — not yet published",
      introduction:
        "This concept notice describes the information handled by the local review version of the JVF Services website. It must be updated and legally reviewed before public launch.",
      sections: [
        {
          title: "Information a visitor provides",
          paragraphs: [
            "The bilingual Google request form may ask for name, phone number, email address, city, ZIP code, selected service, scheduling preferences, and a short non-sensitive note. Service-specific questions may ask about a home or small office, decorating goals, a notary appointment, or interpreting format and duration.",
            "Do not submit documents, identification numbers, medical records, financial account details, or confidential legal information. The concept site has no file uploads.",
          ],
        },
        {
          title: "Google Forms and Calendar",
          paragraphs: [
            "When configured, service requests are submitted directly to Google Forms and consultation times are scheduled through Google Calendar. Google processes the information entered on those services under its own privacy terms and account settings.",
            "JVF Services does not maintain customer accounts on this website. A submitted request or calendar consultation does not confirm service availability, a final price, or a service appointment.",
          ],
        },
        {
          title: "Direct contact alternatives",
          paragraphs: [
            "Visitors may call, text, or email instead of using Google Forms or Google Calendar. Do not send identity documents, medical records, financial account details, or confidential legal information through email or text.",
          ],
        },
        {
          title: "Vercel hosting and Web Analytics",
          paragraphs: [
            "The planned website host is Vercel. Vercel infrastructure may process technical request information needed to serve and protect the site. Vercel Web Analytics is included for privacy-focused aggregate usage measurement; form values and submission contents are not sent as analytics events.",
          ],
        },
        {
          title: "Use and sharing",
          paragraphs: [
            "JVF Services would use request information only to understand, respond to, secure, and improve service inquiries. We do not sell form data. Information may be shared only with service providers needed to operate the website or when required by law, subject to the final launch policy.",
          ],
        },
        {
          title: "Your choices and contact",
          paragraphs: [
            "Visitors may call (716) 748-9117 or email services.jvf@gmail.com instead of using the form. The public mailing address is 2590 Walnut St, Denver, CO 80205. A final retention period and deletion-request process must be approved before public launch.",
          ],
        },
      ],
    },
    accessibility: {
      title: "Accessibility statement",
      status: "Draft for review — not yet published",
      introduction:
        "JVF Services wants people with disabilities to be able to learn about services, navigate the website, and request help with dignity and independence.",
      sections: [
        {
          title: "Our accessibility target",
          paragraphs: [
            "The engineering target for this website is WCAG 2.2 Level AA, the Web Content Accessibility Guidelines. This statement describes an ongoing good-faith effort and is not a guarantee of legal compliance under every law or in every circumstance.",
          ],
        },
        {
          title: "How the site is designed",
          paragraphs: [
            "The site uses semantic headings and landmarks, a skip link, keyboard-operable navigation and forms, visible focus indicators, descriptive links, labeled fields, linked error summaries, live status announcements, strong color contrast, text resizing and reflow support, and reduced-motion preferences.",
            "Pages are intended to work with current screen reader, browser zoom, voice-control, switch-control, and keyboard-only workflows. The site does not depend on color alone and does not use an accessibility overlay or accessibility widget.",
          ],
        },
        {
          title: "Known review-stage limitations",
          paragraphs: [
            "The current build uses the logo and selected images migrated from the existing JVF Services website. An owner profile, any additional photographs, and all future visual changes require appropriate alternative text and another accessibility review before launch.",
            "Automated tests help identify barriers but cannot replace manual keyboard, screen reader, zoom, and user testing. The site will be rechecked when content, integrations, or visual assets change.",
          ],
        },
        {
          title: "Accessibility feedback and assistance",
          paragraphs: [
            "If a page or form is difficult to use, call or text (716) 748-9117 and describe the page, the task you were trying to complete, and the assistive technology or browser involved if you are comfortable sharing it. JVF Services can provide service information and take a request by phone.",
            "You may also email accessibility feedback to services.jvf@gmail.com. Feedback will be reviewed and reasonable efforts will be made to provide an accessible alternative while a barrier is addressed.",
          ],
        },
      ],
    },
  },
} satisfies SiteContent;
