// =======================================================================
// INVITATION CONFIGURATION (Easily customizable for any client)
// Modify this file to instantly rebrand the entire digital invitation!
// =======================================================================

export const invitationConfig = {
  // Child Details
  childName: "AARAV",
  childFullName: "Aarav Prathap",
  age: 1,
  ageSuffix: "st",
  turningText: "TURNS ONE",
  celebrationTitle: "FIRST BIRTHDAY CELEBRATION",
  heroSubtitle: "A LITTLE PRINCE IS TURNING ONE",
  
  // Tamil Traditional Titles
  tamilTitle: "எங்கள் குட்டி இளவரசன்",
  tamilTurningText: "முதல் பிறந்தநாள் விழா",
  tamilHeroTitle: "எங்கள் குட்டி இளவரசனின் முதல் பிறந்தநாள் விழா",
  tamilTagline: "ஒரு வருடம்...",
  tamilStoryTitle: "ஒரு வருடம்... ஆயிரம் நினைவுகள்",
  englishStoryTitle: "ONE YEAR OF LOVE & LITTLE MOMENTS",
  storySummary: "One beautiful year filled with tiny smiles, little adventures and countless precious memories.",
  englishTagline: "ONE BEAUTIFUL YEAR",
  tamilBlessingQuote: "உங்கள் வரவும் வாழ்த்தும் எங்கள் வாழ்வின் பெருமகிழ்ச்சி",

  // Parents
  parents: "PRATHAP & SOFEYA",
  parentsNames: "PRATHAP & SOFEYA",
  fatherName: "Prathap",
  motherName: "Sofeya",
  parentsInviteText: "invite you to celebrate",

  // Date & Time
  date: "18 October 2026",
  displayDate: "18 OCTOBER 2026",
  shortDate: "18 OCT 2026",
  time: "6:00 PM onwards",
  displayTime: "6:00 PM ONWARDS",
  rawDate: "2026-10-18T18:00:00+05:30", // ISO string for countdown

  // Venue & Location
  venue: "The Grand Palace",
  venueSub: "Grand Imperial Ballroom",
  address: "The Grand Palace, 45 GST Road, Guindy, Chennai, Tamil Nadu 600032",
  city: "Chennai, Tamil Nadu",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Grand+Palace+Chennai+Tamil+Nadu",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=The+Grand+Palace+Chennai+Tamil+Nadu",
  venueCoordinates: { lat: 13.0067, lng: 80.2038 },

  // WhatsApp & Contact
  whatsappNumber: "919876543210",
  contactPhone: "+91 98765 43210",
  whatsappRsvpDefaultText: "Hi Prathap & Sofeya! ❤️\n\nI would love to join Aarav's 1st Birthday Celebration on 18 October 2026.\n\nLooking forward to celebrating with you! 🎂",
  shareMessage: "You're invited to Aarav's 1st Birthday Celebration 🎂\n\n18 October 2026\n6:00 PM onwards\nChennai, Tamil Nadu\n\nWe would love to celebrate this special day with you! ❤️",
  whatsappShareMessage: "You're invited to Aarav's 1st Birthday Celebration 🎂\n\n18 October 2026\n6:00 PM onwards\nChennai, Tamil Nadu\n\nWe would love to celebrate this special day with you! ❤️\n\n",

  // Visual Assets
  childImage: "/assets/images/aarav_portrait.jpg",
  childImagePosition: "center 20%", // Responsive framing focused on baby's face
  music: "/assets/music/birthday.mp3",
  theme: "royal-blue-gold",

  // Emotional Message from Parents
  birthdayMessage: {
    heading: "ONE YEAR OF LOVE & LITTLE MOMENTS",
    tamilHeading: "ஒரு வருடம்... ஆயிரம் நினைவுகள்",
    summary: "One beautiful year filled with tiny smiles, little adventures and countless precious memories.",
    paragraphs: [
      "One beautiful year filled with tiny smiles, little adventures and countless precious memories.",
      "From his very first gentle cry to his joyful first steps, Aarav has filled our hearts with a love we never knew existed and turned our home into a kingdom of laughter.",
      "We warmly invite you and your family to join us as we celebrate our little prince AARAV and the immense blessings he has brought into our lives."
    ]
  },

  // Celebration Timeline
  timeline: [
    {
      time: "6:00 PM",
      title: "Royal Guest Arrival",
      desc: "Warm South Indian welcome with rosewater, badam milk & royal appetizers",
      tag: "Welcome Drinks"
    },
    {
      time: "6:30 PM",
      title: "Grand Cake Cutting",
      desc: "Join us around the royal stage as Aarav cuts his magnificent 1st birthday cake",
      tag: "Celebration"
    },
    {
      time: "7:00 PM",
      title: "Kids Fun & Magic Show",
      desc: "Live interactive magic, balloon sculpting, dance and carnival games",
      tag: "Entertainment"
    },
    {
      time: "7:30 PM",
      title: "Grand Royal Feast",
      desc: "A lavish multi-cuisine banquet featuring authentic Chettinad & traditional South Indian feasts",
      tag: "Banquet Dinner"
    },
    {
      time: "8:30 PM",
      title: "Blessings & Photo Session",
      desc: "Shower Aarav with your loving blessings and capture memories at our photo lounge",
      tag: "Cherished Memories"
    }
  ],

  // Dress Code
  dressCode: {
    title: "LET'S CELEBRATE IN STYLE",
    themeName: "Royal Blue • Gold • Cream",
    subtitle: "Dress in your festive best with royal blues, elegant golds or graceful creams",
    swatches: [
      { name: "Royal Midnight Blue", hex: "#0b1b3d", textColor: "#ffffff" },
      { name: "Regal Gold", hex: "#d4af37", textColor: "#080e1a" },
      { name: "Ivory Cream", hex: "#fcf8f0", textColor: "#1b1b1b" }
    ]
  },

  // Gallery Photos
  galleryImages: [
    {
      src: "/assets/images/aarav_portrait.jpg",
      title: "Our Little Prince",
      subtitle: "First Portrait at 1 Year",
      category: "Milestone"
    },
    {
      src: "/assets/images/aarav_cake.jpg",
      title: "Grand 1st Birthday Cake",
      subtitle: "Royal Velvet & 24K Edible Gold",
      category: "Celebration"
    },
    {
      src: "/assets/images/aarav_balloons.jpg",
      title: "Golden Balloon Fun",
      subtitle: "Tiny adventures and bright smiles",
      category: "Playtime"
    },
    {
      src: "/assets/images/aarav_confetti.jpg",
      title: "Laughter in the Confetti",
      subtitle: "Pure unfiltered childhood happiness",
      category: "Giggles"
    },
    {
      src: "/assets/images/aarav_venue.jpg",
      title: "The Grand Palace Ballroom",
      subtitle: "Imperial Hall decorated for our Prince",
      category: "Venue"
    },
    {
      src: "/assets/images/aarav_family.jpg",
      title: "Cherished Family Moments",
      subtitle: "A lifetime of love in tiny hands",
      category: "Family"
    }
  ],

  // Gift & Blessings
  giftHeading: "YOUR PRESENCE IS OUR GREATEST GIFT",
  giftMessage: "Your heartfelt blessings, warm love, and joyful presence with us on Aarav's special milestone will mean the world to our family. No boxed gifts, please.",
  tamilGiftText: "உங்கள் நல்லாசிகளே எங்களின் மிகப்பெரிய பரிசு",

  // Theme Presets for Client Demo Switcher
  themePresets: [
    {
      id: "royal-blue",
      name: "Royal Blue & Gold",
      badge: "Selected (Aarav)",
      previewColors: ["#071126", "#d4af37", "#fdfbf7"]
    },
    {
      id: "pink-rosegold",
      name: "Pink & Rose Gold",
      badge: "Princess Theme",
      previewColors: ["#2d0e1c", "#e0859c", "#fff0f5"]
    },
    {
      id: "black-gold",
      name: "Black & Luxe Gold",
      badge: "Milestone / 18th",
      previewColors: ["#0a0a0a", "#e6be5a", "#ffffff"]
    },
    {
      id: "pastel-baby",
      name: "Pastel Dream Baby",
      badge: "Naming / 1st",
      previewColors: ["#162a35", "#89c5cc", "#f2faff"]
    },
    {
      id: "jungle-safari",
      name: "Jungle Safari Luxury",
      badge: "Wild One Theme",
      previewColors: ["#0f2419", "#d4a34b", "#f5faee"]
    }
  ]
};
