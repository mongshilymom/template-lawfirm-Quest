# Design Guidelines: 법무법인 태평양 (BKL) Website Clone

## Design Approach
**Reference-Based Approach**: Drawing inspiration from elite professional services firms including the actual BKL website, Baker McKenzie, Clifford Chance, and Skadden Arps. The design prioritizes trust, credibility, and sophisticated professionalism characteristic of top-tier international law firms.

**Core Design Principles**:
- Authoritative Professionalism: Clean, uncluttered layouts that convey expertise
- Visual Gravitas: Strategic use of high-quality imagery to establish credibility
- Information Hierarchy: Clear prioritization of practice areas and firm achievements
- Bilingual Excellence: Seamless Korean/English language switching

---

## Color Palette

**Primary Colors**:
- Deep Navy: 220 45% 15% - Primary brand, headers, navigation
- Pure White: 0 0% 100% - Background, content areas
- Charcoal: 220 10% 25% - Body text, secondary elements

**Accent Colors**:
- Professional Blue: 215 65% 45% - Links, CTAs, interactive elements
- Warm Gray: 30 5% 50% - Borders, dividers, subtle UI elements

**Background Treatments**:
- Light Gray: 220 10% 97% - Section backgrounds for subtle contrast
- Image Overlays: Navy with 50-70% opacity for text legibility on hero images

---

## Typography

**Font Families**:
- Primary (Korean): 'Noto Sans KR' (400, 500, 700) - Clean, professional Korean typography
- Primary (English): 'Inter' (400, 500, 600, 700) - Modern, highly legible sans-serif
- Accent (Headings): 'Playfair Display' (600, 700) - Serif for distinguished section headers

**Type Scale**:
- Hero Headlines: text-5xl md:text-6xl lg:text-7xl font-bold
- Section Headers: text-3xl md:text-4xl lg:text-5xl font-semibold
- Subsections: text-2xl md:text-3xl font-medium
- Body Large: text-lg leading-relaxed
- Body: text-base leading-relaxed
- Captions: text-sm text-gray-500

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 (e.g., p-8, gap-12, my-20)

**Container Strategy**:
- Full-width hero: w-full with inner max-w-7xl mx-auto px-6 lg:px-8
- Content sections: max-w-6xl mx-auto
- Text content: max-w-4xl for optimal readability
- Tight content (cards): max-w-7xl with grid layouts

**Vertical Rhythm**:
- Section padding: py-16 md:py-20 lg:py-24
- Component spacing: space-y-12 md:space-y-16
- Card/grid gaps: gap-6 md:gap-8 lg:gap-10

---

## Component Library

**Navigation**:
- Sticky header with subtle shadow on scroll
- Logo left-aligned, main menu center, language toggle right
- Desktop: Horizontal menu with dropdown mega-menus for practice areas
- Mobile: Slide-in drawer with accordion submenus
- CTA button: "Contact Us" in professional blue

**Hero Section**:
- Full-screen image carousel (h-screen or min-h-[600px])
- Professional photography: modern office, team collaboration, skyline
- Gradient overlay: linear from navy 70% opacity to transparent
- Centered headline + subtitle + CTA button
- Carousel indicators: minimal dots at bottom

**Practice Areas Carousel**:
- Cards with subtle hover lift effect (translate-y-1)
- Icon + Title + Brief description + "Learn More" link
- 3-column grid on desktop, 2-col tablet, 1-col mobile
- Navigation arrows outside card container

**News/Insights Grid**:
- Featured article: Large image + headline + excerpt (2-column span)
- Standard articles: Image thumbnail + date + category badge + headline
- Grid: lg:grid-cols-3 md:grid-cols-2
- Category filters: Pills with active state

**Attorney Profiles**:
- Professional headshots in consistent 3:4 ratio
- Name + Position + Practice areas
- Grid layout with hover overlay showing contact info
- Filter by practice area, office location

**Footer**:
- 4-column layout: About BKL, Quick Links, Global Offices, Contact
- Office addresses with icons
- Social media links (LinkedIn primary for B2B)
- Newsletter signup: "Subscribe to Legal Updates"
- Copyright + Privacy Policy links

---

## Images

**Required Images**:

1. **Hero Carousel (3-5 images)**:
   - Modern glass office building exterior with blue sky
   - Professional team meeting in contemporary conference room
   - Seoul skyline at dusk from high-rise office
   - International handshake/business meeting
   - Legal documents/scales of justice (subtle, sophisticated)

2. **Practice Area Icons**:
   - Use Heroicons for: scale (litigation), building-office (corporate), globe-asia (international), shield-check (compliance), etc.

3. **About Section**:
   - Firm founders/partners professional headshots
   - Historic timeline images
   - Global office locations map or images

4. **News/Insights Thumbnails**:
   - Abstract legal/business imagery
   - Event photos (seminars, awards)
   - Infographic-style visuals

---

## Interactions & Animations

**Minimalist Motion**:
- Page transitions: Fade in with slight upward movement (20px)
- Card hovers: Subtle shadow increase + 2px lift
- Image reveals: Fade in as they enter viewport
- Carousel: Smooth crossfade (800ms)
- **No** parallax scrolling or heavy animations - maintain professionalism

**Interactive States**:
- Links: Underline on hover with smooth transition
- Buttons: Slight scale (0.98) on active, color deepening on hover
- Form inputs: Blue border on focus, subtle shadow

---

## Key Differentiators

**Professional Trust Indicators**:
- Client logos section: "Trusted by Fortune 500 Companies"
- Awards and recognitions with prestigious legal publication logos
- Statistics: "550+ Attorneys | 9 Global Offices | 40+ Years"
- Testimonials from high-profile clients (if available)

**Bilingual Design**:
- Language toggle (KO/EN) in header - flag icons or text
- Font switching: Noto Sans KR ↔ Inter seamlessly
- Maintain layout integrity across languages
- RTL-ready grid system

**Mobile Optimization**:
- Touch-friendly tap targets (min 44px)
- Simplified navigation with clear hierarchy
- Optimized images for mobile performance
- Single column layouts for readability

This design establishes BKL as a world-class legal institution through sophisticated visual design, strategic use of white space, and authoritative content presentation. The result is a website that commands respect and instills confidence in potential clients seeking top-tier legal representation.