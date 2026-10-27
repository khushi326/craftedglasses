/**
 * Temporary Frontend Product Catalog (Phase 2 UI only)
 * Contains product metadata, options, materials, and product-specific customisation field specifications.
 */

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '✨' },
  { id: 'mobile-covers', name: 'Mobile Covers', icon: '📱' },
  { id: 'photo-frames', name: 'Photo Frames', icon: '🖼️' },
  { id: 'phone-charms', name: 'Phone Charms', icon: '📿' },
  { id: 'vintage-letters', name: 'Vintage Letters', icon: '📜' },
  { id: 'memory-calendars', name: 'Memory Calendars', icon: '🗓️' },
  { id: 'custom-gifts', name: 'Custom Gifts', icon: '🎁' },
];

/**
 * Category matching helper supporting slug normalization and legacy aliases.
 */
export const matchCategory = (productCategory, selectedCategory) => {
  if (!selectedCategory || selectedCategory === 'all') return true;
  if (!productCategory) return false;
  const pCat = String(productCategory).toLowerCase().trim();
  const sCat = String(selectedCategory).toLowerCase().trim();
  if (pCat === sCat) return true;
  // Aliases for Mobile Covers / Phone Cases
  if (
    (sCat === 'mobile-covers' || sCat === 'phone-cases' || sCat === 'mobile-cover' || sCat === 'phone-case') &&
    (pCat === 'mobile-covers' || pCat === 'phone-cases' || pCat === 'mobile-cover' || pCat === 'phone-case')
  ) {
    return true;
  }
  return false;
};

export const PRODUCTS = [
  {
    id: 'pressed-flower-case',
    type: 'mobile-cover',
    name: 'Pressed Flower Resin Phone Case',
    category: 'mobile-covers',
    categoryName: 'Mobile Covers',
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
    description: 'A timeless, museum-grade memory frame crafted with natural reclaimed pine, distressed vintage finish, and delicate dried gypsophila arrangements. Perfect for anniversaries, birthdays, and cherished milestones.',
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
    description: 'An emotional, keepsake letter written with traditional dip-pen calligraphy on artisanal textured handmade cotton paper. Finished with botanical dried florals, golden flakes, and pressed with an authentic wax seal stamp.',
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
    description: 'Add a vintage, whimsical flair to your phone or camera with this handcrafted phone charm. Made with high-tensile braided silk cord, natural baroque pearls, Czech glass beads, and romantic rose quartz chips.',
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
    description: 'Celebrate 12 months of memories. Each month features a polaroid of your unforgettable moments along with highlighted anniversaries, birthdays, and customized notes. Rested on a handcrafted walnut block.',
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
        { id: 'importantDates', label: 'Important Dates', type: 'textarea', required: true, placeholder: 'e.g., 14th Feb (Valentine\'s), 23rd May (Birthday), 12th Oct (Anniversary)...' },
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
    description: 'Our master crafters work with you to create an entirely one-of-a-kind bespoke keepsake. Includes custom hand-bound memory journal, scented botanical wax sachet, personalized letter, and polaroid frame inside a luxury pine keepsake box.',
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

export const REVIEWS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Mumbai',
    rating: 5,
    comment: 'The vintage letter and wax seal brought tears to my partner’s eyes on our anniversary. The calligraphy and packaging felt straight out of a classic novel!',
    product: 'Vintage Handwritten Letter',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    city: 'Delhi',
    rating: 5,
    comment: 'Ordered the pressed flower phone case with custom gold lettering. The quality of the resin and the dried flowers is extraordinary. Very aesthetic!',
    product: 'Pressed Flower Resin Phone Case',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Pooja Iyer',
    city: 'Bengaluru',
    rating: 5,
    comment: 'The 12-month memory calendar on walnut wood is sitting on my desk right now. Everyone at work keeps asking where I got it made. Truly thoughtful handmade art.',
    product: 'Memory Calendar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
];

export const MOCK_ORDERS = [
  {
    id: 'CG-89210',
    productName: 'Pressed Flower Resin Phone Case',
    productType: 'phone-case',
    customerName: 'Khushi',
    customerEmail: 'khushi@test.com',
    customerPhone: '+91 91564 35456',
    deliveryAddress: '124 Rose Garden Lane, Heritage Enclave, Jaipur, Rajasthan - 302001',
    image: '/assets/products/pressed-flower-case.jpg',
    orderDate: 'October 5, 2026',
    price: 899,
    status: 'Processing',
    statusClass: 'status-processing',
    customisationSummary: 'iPhone 15 Pro, Personalised Text: "Olivia", Warm Blush tone',
  },
  {
    id: 'CG-88741',
    productName: 'Vintage Handwritten Letter',
    productType: 'vintage-letter',
    customerName: 'Khushi',
    customerEmail: 'khushi@test.com',
    customerPhone: '+91 91564 35456',
    deliveryAddress: '124 Rose Garden Lane, Heritage Enclave, Jaipur, Rajasthan - 302001',
    image: '/assets/products/handwritten-wax-sealed-letter.jpg',
    orderDate: 'September 28, 2026',
    price: 649,
    status: 'Confirmed',
    statusClass: 'status-confirmed',
    customisationSummary: 'To: Eleanor, Antique Gold Seal, Lavender sprig',
  },
  {
    id: 'CG-87502',
    productName: 'Antique Gold Wood Memory Frame',
    productType: 'photo-frame',
    customerName: 'Khushi',
    customerEmail: 'khushi@test.com',
    customerPhone: '+91 91564 35456',
    deliveryAddress: '124 Rose Garden Lane, Heritage Enclave, Jaipur, Rajasthan - 302001',
    image: '/assets/products/vintage-wooden-photo-frame.jpg',
    orderDate: 'September 15, 2026',
    price: 1299,
    status: 'Completed',
    statusClass: 'status-completed',
    customisationSummary: 'Medium 8x10, Anniversary theme, Quote included',
  },
  {
    id: 'CG-86104',
    productName: 'Phone Charm',
    productType: 'phone-charm',
    customerName: 'Khushi',
    customerEmail: 'khushi@test.com',
    customerPhone: '+91 91564 35456',
    deliveryAddress: '124 Rose Garden Lane, Heritage Enclave, Jaipur, Rajasthan - 302001',
    image: '/assets/products/beaded-pearl-phone-charm.jpg',
    orderDate: 'September 10, 2026',
    price: 499,
    status: 'Contacted',
    statusClass: 'status-contacted',
    customisationSummary: 'Standard Wristlet, Blush Rose & Pearl, Qty: 1',
  },
  {
    id: 'CG-85912',
    productName: 'Custom Gift',
    productType: 'custom-gift',
    customerName: 'Khushi',
    customerEmail: 'khushi@test.com',
    customerPhone: '+91 91564 35456',
    deliveryAddress: '124 Rose Garden Lane, Heritage Enclave, Jaipur, Rajasthan - 302001',
    image: '/assets/products/bespoke-custom-gift-hamper.png',
    orderDate: 'September 2, 2026',
    price: 2499,
    status: 'New',
    statusClass: 'status-new',
    customisationSummary: 'Bespoke Memory Trunk, Birthday Occasion, Budget: ₹3,500 - ₹5,000',
  },
  {
    id: 'CG-84320',
    productName: 'Memory Calendar',
    productType: 'memory-calendar',
    customerName: 'Khushi',
    customerEmail: 'khushi@test.com',
    customerPhone: '+91 91564 35456',
    deliveryAddress: '124 Rose Garden Lane, Heritage Enclave, Jaipur, Rajasthan - 302001',
    image: '/assets/products/handcrafted-memory-calendar.jpg',
    orderDate: 'August 24, 2026',
    price: 1499,
    status: 'Cancelled',
    statusClass: 'status-cancelled',
    customisationSummary: 'Walnut Stand, Cancelled per customer request on WhatsApp',
  },
];
