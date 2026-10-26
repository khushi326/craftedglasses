/**
 * Shared catalog used by the one-off seed script and by startup auto-seed.
 */
export const CATEGORIES_DATA = [
  { name: 'Phone Cases', slug: 'phone-cases', icon: '📱', description: 'Handcrafted custom resin phone cases' },
  { name: 'Photo Frames', slug: 'photo-frames', icon: '🖼️', description: 'Vintage and antique photo frames' },
  { name: 'Vintage Letters', slug: 'vintage-letters', icon: '📜', description: 'Handwritten wax-sealed letters' },
  { name: 'Phone Charms', slug: 'phone-charms', icon: '📿', description: 'Beaded and pearl phone charms' },
  { name: 'Memory Calendars', slug: 'memory-calendars', icon: '🗓️', description: 'Custom 12-month photo memory calendars' },
  { name: 'Custom Gifts', slug: 'custom-gifts', icon: '🎁', description: 'Bespoke luxury gift hampers' },
];

export const PRODUCTS_DATA = [
  {
    id: 'pressed-flower-case',
    type: 'phone-case',
    name: 'Pressed Flower Resin Phone Case',
    category: 'phone-cases',
    categoryName: 'Phone Cases',
    price: 899,
    availability: 'In Stock',
    badge: 'Bestseller',
    shortDescription: 'Real dried florals preserved in crystal-clear glossy resin with custom gold foil lettering.',
    description: 'Each phone case is meticulously hand-poured with real botanicals, dried rose petals, and subtle gold flakes. Customise it with your name or initials to carry a piece of nature and memory wherever you go.',
    materials: ['High-Grade TPU Edge', 'Crystal Clear Bio-Resin', 'Real Dried Botanicals', 'Metallic Gold Leaf'],
    image: '/assets/products/pressed-flower-case.jpg',
    gallery: [
      '/assets/products/pressed-flower-case.jpg',
    ],
    availableOptions: {
      finishTypes: ['Glossy Resin', 'Matte Soft-Touch'],
      accentColors: ['Gold Flakes', 'Silver Flakes', 'Rose Gold Foil', 'Pure Floral'],
    },
    customisationSchema: {
      fields: [
        { id: 'phoneModel', label: 'Phone Model', type: 'select', required: true, options: ['iPhone 15 / 15 Pro / 15 Plus', 'iPhone 14 / 14 Pro', 'iPhone 13 / 13 Pro', 'Samsung Galaxy S24 / Ultra', 'Samsung Galaxy S23', 'OnePlus 12 / 11', 'Other (specify in notes)'] },
        { id: 'photoUpload', label: 'Photo Upload', type: 'file', required: false, helper: 'Upload JPG/PNG' },
        { id: 'personalisedText', label: 'Personalised Text', type: 'text', required: false, placeholder: 'e.g., Olivia or "Always & Forever"' },
        { id: 'designPreference', label: 'Design Preference', type: 'select', required: true, options: ['Vintage Warm Blush & Cream', 'Earthy Terracotta & Gold', 'Lavender Dreams', 'Pastel Meadow'] },
        { id: 'instructions', label: 'Instructions', type: 'textarea', required: false, placeholder: 'Any special placement, fonts, or details...' },
      ],
    },
  },
  {
    id: 'vintage-wooden-photo-frame',
    type: 'photo-frame',
    name: 'Antique Gold Wood Memory Frame',
    category: 'photo-frames',
    categoryName: 'Photo Frames',
    price: 1299,
    availability: 'In Stock',
    badge: 'Popular',
    shortDescription: 'Distressed vintage wood frame with custom mounted polaroid photo and hand-lettered plaque.',
    description: 'A timeless, museum-grade memory frame crafted with natural reclaimed pine, distressed vintage finish, and delicate dried gypsophila arrangements.',
    materials: ['Solid Reclaimed Pine', 'Distressed Gold Patina', 'UV Glass Protection', 'Handmade Deckle-Edge Paper'],
    image: '/assets/products/vintage-wooden-photo-frame.jpg',
    gallery: [
      '/assets/products/vintage-wooden-photo-frame.jpg',
    ],
    availableOptions: {
      sizes: ['Small (5x7 inches)', 'Medium (8x10 inches)', 'Large (10x12 inches)'],
      frameColors: ['Vintage Warm Walnut', 'Antique Gilded Gold', 'Distressed Soft Ivory'],
    },
    customisationSchema: {
      fields: [
        { id: 'frameSize', label: 'Frame Size', type: 'select', required: true, options: ['Small (5x7 in)', 'Medium (8x10 in)', 'Large (10x12 in)'] },
        { id: 'photoUpload', label: 'Photo Upload', type: 'file', required: true, helper: 'Upload photo to print' },
        { id: 'customText', label: 'Custom Text', type: 'text', required: false, placeholder: 'e.g., "04.10.2023 - Where our story began"' },
        { id: 'occasion', label: 'Occasion', type: 'select', required: true, options: ['Anniversary', 'Birthday', 'Wedding / Engagement', 'Friendship / Love', 'Graduation', 'Just Because'] },
        { id: 'instructions', label: 'Instructions', type: 'textarea', required: false, placeholder: 'Specific photo filters, cropping, or notes...' },
      ],
    },
  },
  {
    id: 'handwritten-wax-sealed-letter',
    type: 'vintage-letter',
    name: 'Vintage Handwritten Letter',
    category: 'vintage-letters',
    categoryName: 'Vintage Letters',
    price: 649,
    availability: 'In Stock',
    badge: 'Handcrafted',
    shortDescription: 'Coffee-stained deckle-edged paper, dip-pen calligraphy, dried lavender sprig, and custom wax seal.',
    description: 'An emotional, keepsake letter written with traditional dip-pen calligraphy on artisanal textured handmade cotton paper.',
    materials: ['100% Recycled Cotton Rag Paper (150 GSM)', 'Archival Brown Calligraphy Ink', 'Real Dried Lavender Sprigs', 'Metallic Sealing Wax'],
    image: '/assets/products/handwritten-wax-sealed-letter.jpg',
    gallery: [
      '/assets/products/handwritten-wax-sealed-letter.jpg',
    ],
    availableOptions: {
      envelopeStyles: ['Artisanal Brown Kraft', 'Soft Rose Handmade Cotton', 'Vintage Parchment'],
      sealColors: ['Antique Gold', 'Burgundy Wine', 'Sage Green', 'Rose Bronze'],
    },
    customisationSchema: {
      fields: [
        { id: 'recipientName', label: 'Recipient Name', type: 'text', required: true, placeholder: 'e.g., To My Dearest Eleanor' },
        { id: 'letterMessage', label: 'Letter Message', type: 'textarea', required: true, placeholder: 'Type your message here. We will handwrite it with dip-pen calligraphy...' },
        { id: 'waxSealPreference', label: 'Wax Seal Preference', type: 'select', required: true, options: ['Antique Gold - Botanical Leaf', 'Burgundy Wine - Heart Monogram', 'Rose Bronze - Rose Emblem', 'Sage Green - Celestial Sun'] },
        { id: 'instructions', label: 'Instructions', type: 'textarea', required: false, placeholder: 'Lavender aroma spray, extra ribbons, or delivery notes...' },
      ],
    },
  },
  {
    id: 'beaded-pearl-phone-charm',
    type: 'phone-charm',
    name: 'Phone Charm',
    category: 'phone-charms',
    categoryName: 'Phone Charms',
    price: 499,
    availability: 'In Stock',
    badge: 'Trending',
    shortDescription: 'Delicate phone wristlet hand-strung with genuine freshwater pearls, lampwork beads, and gold accents.',
    description: 'Add a vintage, whimsical flair to your phone or camera with this handcrafted phone charm.',
    materials: ['Natural Freshwater Baroque Pearls', 'Rose Quartz & Czech Glass Beads', '18K Gold Plated Spacers', 'Reinforced Braided Cord'],
    image: '/assets/products/beaded-pearl-phone-charm.jpg',
    gallery: [
      '/assets/products/beaded-pearl-phone-charm.jpg',
    ],
    availableOptions: {
      lengths: ['Wristlet Loop (18 cm)', 'Long Shoulder Lanyard (45 cm)'],
      beadPalettes: ['Blush Rose & Pearls', 'Golden Sunset & Amber', 'Matcha Mint & Quartz', 'Celestial Moonlight'],
    },
    customisationSchema: {
      fields: [
        { id: 'charmType', label: 'Charm Type', type: 'select', required: true, options: ['Standard Wristlet (18cm)', 'Longer Cross-Wrist Lanyard (24cm)', 'Bag/Key Charm Hook'] },
        { id: 'colorPreference', label: 'Color Preference', type: 'select', required: true, options: ['Blush Rose & Pearl', 'Warm Terracotta & Sunstone', 'Cream, Gold & Clear Quartz', 'Custom Mixed Pastels'] },
        { id: 'quantity', label: 'Quantity', type: 'select', required: true, options: ['1 Piece', '2 Pieces (Matching Pair / BFFs)', '3 Pieces Gift Set'] },
        { id: 'instructions', label: 'Instructions', type: 'textarea', required: false, placeholder: 'Mention initial letter beads (e.g., "A & R") or specific charms...' },
      ],
    },
  },
  {
    id: 'handcrafted-memory-calendar',
    type: 'memory-calendar',
    name: 'Memory Calendar',
    category: 'memory-calendars',
    categoryName: 'Memory Calendars',
    price: 1499,
    availability: 'In Stock',
    badge: 'New',
    shortDescription: '12 custom photo cards printed on textured linen cardstock with solid walnut wood display stand.',
    description: 'Celebrate 12 months of memories with personalized polaroid-style photos on a handcrafted walnut block.',
    materials: ['Solid Walnut Wood Block', '300 GSM Textured Linen Paper', 'Brass Binder Pin', 'Gift Box with Ribbon'],
    image: '/assets/products/handcrafted-memory-calendar.jpg',
    gallery: [
      '/assets/products/handcrafted-memory-calendar.jpg',
    ],
    availableOptions: {
      startMonths: ['January 2026', 'Current Month Onward', 'Custom 12-Month Range'],
      woodFinishes: ['Natural Solid Walnut', 'Warm Teak', 'Rustic Birch'],
    },
    customisationSchema: {
      fields: [
        { id: 'photos', label: 'Photos', type: 'file', required: true, helper: 'Upload photos for calendar months' },
        { id: 'importantDates', label: 'Important Dates', type: 'textarea', required: true, placeholder: "e.g., 14th Feb (Valentine's), 23rd May (Birthday)..." },
        { id: 'customText', label: 'Custom Text', type: 'text', required: false, placeholder: 'e.g., "The Sharma Family - 2026 Memories"' },
        { id: 'instructions', label: 'Instructions', type: 'textarea', required: false, placeholder: 'Any specific quotes or layout notes...' },
      ],
    },
  },
  {
    id: 'bespoke-custom-gift-hamper',
    type: 'custom-gift',
    name: 'Custom Gift',
    category: 'custom-gifts',
    categoryName: 'Custom Gifts',
    price: 2499,
    availability: 'Made to Order',
    badge: 'Exclusive',
    shortDescription: 'Tailored luxury gift box curated around your personal love story or friendship memory.',
    description: 'Our master crafters work with you to create an entirely one-of-a-kind bespoke keepsake.',
    materials: ['Handmade Wooden Keepsake Chest', 'Botanical Soy Wax Sachet', 'Handmade Journal', 'Vintage Ribbons & Wax Seals'],
    image: '/assets/products/bespoke-custom-gift-hamper.png',
    gallery: [
      '/assets/products/bespoke-custom-gift-hamper.png',
    ],
    availableOptions: {
      boxSizes: ['Classic Keepsake Chest', 'Grand Luxury Trunk'],
      fragrances: ['English Lavender & Vanilla', 'Warm Sandalwood & Amber', 'Wild Rose & Peony'],
    },
    customisationSchema: {
      fields: [
        { id: 'giftType', label: 'Gift Type', type: 'select', required: true, options: ['Bespoke Memory Trunk', 'Romantic Anniversary Box', 'Best Friend Birthday Trunk', 'Bridal Shower / Wedding Keepsake', 'Long Distance Love Box'] },
        { id: 'occasion', label: 'Occasion', type: 'text', required: true, placeholder: 'e.g., 5th Wedding Anniversary' },
        { id: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Tell us about the person, favorite memories, colors, or items...' },
        { id: 'photos', label: 'Photos', type: 'file', required: false, helper: 'Photos to include in the keepsake' },
        { id: 'budget', label: 'Budget', type: 'select', required: true, options: ['₹2,000 - ₹3,500', '₹3,500 - ₹5,000', '₹5,000 - ₹10,000+'] },
        { id: 'instructions', label: 'Instructions', type: 'textarea', required: false, placeholder: 'Specific color themes, requested fragrance notes, or notes...' },
      ],
    },
  },
];
