/**
 * UI chrome strings (navigation, buttons, labels).
 * Domain content is localised inline via `LocalizedText`; this dictionary is
 * only for static interface text.
 */
export type Lang = 'ta' | 'en';

export const strings = {
  brand: { ta: 'கோயில்OS', en: 'TempleOS' },
  tagline: {
    ta: 'தமிழ்நாடு அரசு இந்து சமய அறநிலையத் துறை',
    en: 'Tamil Nadu HR&CE — Official Platform',
  },

  nav: {
    home: { ta: 'முகப்பு', en: 'Home' },
    explore: { ta: 'ஆராய்', en: 'Explore' },
    updates: { ta: 'செய்திகள்', en: 'Updates' },
    bookings: { ta: 'முன்பதிவு', en: 'Bookings' },
    myTemple: { ta: 'என் கோயில்', en: 'My Temple' },
    admin: { ta: 'நிர்வாகம்', en: 'Admin' },
  },

  action: {
    follow: { ta: 'பின்தொடர்', en: 'Follow' },
    following: { ta: 'பின்தொடர்கிறீர்கள்', en: 'Following' },
    book: { ta: 'முன்பதிவு', en: 'Book' },
    donate: { ta: 'நன்கொடை', en: 'Donate' },
    navigate: { ta: 'வழிகாட்டு', en: 'Navigate' },
    share: { ta: 'பகிர்க', en: 'Share' },
    viewAll: { ta: 'அனைத்தையும் காண', en: 'View all' },
    search: { ta: 'தேடுக', en: 'Search' },
    seeMore: { ta: 'மேலும் காண', en: 'See more' },
    back: { ta: 'பின் செல்க', en: 'Back' },
  },

  home: {
    badge: {
      ta: 'அதிகாரப்பூர்வ HR&CE டிஜிட்டல் தளம் · தமிழ்நாடு',
      en: 'Official HR&CE Digital Platform · Tamil Nadu',
    },
    heroTitle: { ta: 'அனைவரும் வருக', en: 'Welcome, one and all' },
    coverSubtitle: {
      ta: 'இறைவன் அருள் அனைவருக்கும்',
      en: "The Lord's grace, for one and all",
    },
    heroTagline: {
      ta: 'தமிழ்நாட்டின் புனிதத் தலங்களைக் கண்டறிந்து முன்பதிவு செய்து இணையுங்கள்',
      en: 'Discover, book and connect with the sacred temples of Tamil Nadu',
    },
    heroSubtitle: {
      ta: 'தமிழ்நாட்டின் 46,000+ கோயில்கள். ஒரே இடத்தில் தரிசனம், முன்பதிவு, யாத்திரை.',
      en: 'Darshan, bookings and pilgrimage across 46,000+ temples of Tamil Nadu.',
    },
    templesWord: { ta: 'கோயில்கள்', en: 'temples' },
    districtsWord: { ta: 'மாவட்டங்கள்', en: 'districts' },
    onePlatform: { ta: 'ஒரே தளம்', en: 'One platform' },
    searchPlaceholder: { ta: 'கோயில், ஊர் அல்லது தெய்வம் தேடுங்கள்', en: 'Search a temple, town or deity' },
    featured: { ta: 'சிறப்புக் கோயில்கள்', en: 'Featured temples' },
    nearby: { ta: 'அருகிலுள்ள கோயில்கள்', en: 'Nearby temples' },
    liveFestivals: { ta: 'நடக்கும் திருவிழாக்கள்', en: 'Live festivals' },
    routes: { ta: 'யாத்திரை வழிகள்', en: 'Pilgrimage routes' },
    categories: { ta: 'வகைகள்', en: 'Categories' },
    updates: { ta: 'சமீபத்திய செய்திகள்', en: 'Latest updates' },
  },

  section: {
    overview: { ta: 'மேலோட்டம்', en: 'Overview' },
    history: { ta: 'வரலாறு', en: 'History' },
    gallery: { ta: 'படங்கள்', en: 'Gallery' },
    timings: { ta: 'நேரங்கள்', en: 'Timings' },
    poojas: { ta: 'பூஜைகள்', en: 'Poojas' },
    services: { ta: 'சேவைகள்', en: 'Services' },
    donations: { ta: 'நன்கொடைகள்', en: 'Donations' },
    renovation: { ta: 'திருப்பணி', en: 'Renovation' },
    heritage: { ta: 'பாரம்பரியம்', en: 'Heritage' },
    facilities: { ta: 'வசதிகள்', en: 'Facilities' },
    festivals: { ta: 'திருவிழாக்கள்', en: 'Festivals' },
    nearby: { ta: 'அருகில்', en: 'Nearby' },
  },

  common: {
    openNow: { ta: 'இப்போது திறந்துள்ளது', en: 'Open now' },
    closed: { ta: 'மூடப்பட்டுள்ளது', en: 'Closed' },
    open: { ta: 'திறந்து', en: 'Open' },
    shut: { ta: 'மூடி', en: 'Closed' },
    live: { ta: 'நேரலை', en: 'Live' },
    km: { ta: 'கி.மீ', en: 'km' },
    followers: { ta: 'பின்தொடர்பவர்கள்', en: 'followers' },
    stops: { ta: 'நிறுத்தங்கள்', en: 'stops' },
    days: { ta: 'நாட்கள்', en: 'days' },
    loading: { ta: 'ஏற்றுகிறது…', en: 'Loading…' },
    noResults: { ta: 'முடிவுகள் இல்லை', en: 'No results found' },
    comingSoon: { ta: 'விரைவில்', en: 'Coming soon' },
    raised: { ta: 'திரட்டப்பட்டது', en: 'raised' },
    goal: { ta: 'இலக்கு', en: 'goal' },
  },

  a11y: {
    title: { ta: 'அணுகல்தன்மை', en: 'Accessibility' },
    senior: { ta: 'மூத்த குடிமக்கள் பயன்முறை', en: 'Senior citizen mode' },
    contrast: { ta: 'உயர் மாறுபாடு', en: 'High contrast' },
    language: { ta: 'மொழி', en: 'Language' },
  },
} as const;

export type StringLeaf = { ta: string; en: string };
