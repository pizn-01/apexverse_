# ApexVerse Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from premium creative portfolio sites like Behance, Dribbble portfolios, and high-end agency websites. The design balances professional credibility with creative personality, targeting authors seeking publishing services while showcasing artistic capabilities.

**Core Design Principles**:
1. **Dual Identity**: Blend professionalism (for credibility) with creative flair (to showcase artistic skills)
2. **Trust Through Transparency**: Clear pricing, process, and founder stories build confidence
3. **Portfolio-First Thinking**: Visual work samples drive conversion
4. **Conversion Clarity**: Direct paths to Interest Form and service selection

---

## Typography System

**Font Stack**:
- Headings/Titles: "Cinzel" (serif, elegant, literary feel) via Google Fonts
- Body Text: "Poppins" (sans-serif, clean, readable) via Google Fonts

**Typography Hierarchy**:
- **Hero Headlines**: Cinzel, 4xl to 6xl responsive (text-4xl md:text-5xl lg:text-6xl), font-bold, letter-spacing tight
- **Section Headings**: Cinzel, 3xl to 4xl responsive, font-semibold
- **Subheadings**: Cinzel, xl to 2xl, font-medium
- **Service Titles/Card Headers**: Poppins, lg to xl, font-semibold
- **Body Text**: Poppins, base size, font-normal, leading-relaxed for readability
- **Pricing/Numbers**: Poppins, 2xl to 3xl, font-bold for emphasis
- **Small Text/Captions**: Poppins, sm, font-light

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistency
- Component internal padding: p-4 to p-8
- Section vertical spacing: py-16 to py-24 (py-12 on mobile)
- Container gaps: gap-6 to gap-12
- Element margins: m-4, m-6, m-8

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl mx-auto px-6
- Content sections: max-w-6xl
- Text-heavy content: max-w-4xl for readability
- Narrow content (forms): max-w-2xl

**Grid Systems**:
- Services Grid: 3 columns desktop (lg:grid-cols-3), 2 tablet (md:grid-cols-2), 1 mobile
- Portfolio Gallery: Masonry-style or 3-column grid with varied heights
- Pricing Tables: Side-by-side comparison on desktop, stacked on mobile
- Founder Bios: 2-column layout with image + text

---

## Component Library

### Navigation
- Sticky header with subtle shadow on scroll
- Logo left, navigation center/right
- Desktop: Horizontal menu with 9 page links
- Mobile: Hamburger menu with full-screen overlay
- CTA button in navigation: "Get Started" or "Interest Form"
- Icons: Heroicons for menu/close icons

### Hero Sections

**Homepage Hero**:
- Full viewport height (min-h-screen) with large background image showcasing book/creative work
- Centered content with headline "Just two creatives looking to make your dreams come true"
- Dual CTA buttons: "View Our Services" (primary) + "See Our Work" (secondary)
- Buttons with backdrop blur when over images
- Subtle scroll indicator at bottom

**Interior Page Heroes**:
- Reduced height (h-64 to h-80) with page title
- Breadcrumb navigation
- Gradient overlay on background patterns

### Service Cards
- Elevated cards with hover lift effect
- Icon/graphic at top (illustration samples for visual services)
- Service title, description, key features as bullet list
- Pricing callout if applicable
- CTA button: "Learn More" or "Get This Service"
- Use Heroicons for feature checkmarks

### Founder Bio Cards (About Us)
- Side-by-side layout: circular portrait image left, bio text right
- Alternating layout for Mark and Birdie (left-right, right-left)
- Name in Cinzel, role subtitle in Poppins
- Quote callout in italics
- Personal touch: hand-drawn underlines or accent elements

### Pricing Tables
- Card-based comparison layout
- Service tier name prominently displayed
- Price in large, bold Poppins
- Feature list with checkmarks (Heroicons)
- "What's Included" section with clear hierarchy
- Prominent CTA: "Choose This Package" or "Get Started"
- Payment plan notation for Standard/Full Service

### Portfolio Gallery
- Masonry grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Lightbox modal on click for full-size viewing
- Categories: Character Art, Book Covers, Promotional Graphics, Chapter Headers
- Hover overlay with project title and category tag
- Filter buttons above gallery

### Forms
- Clean, spacious layout with generous padding
- Label above input, Poppins medium weight
- Input fields with border, focus state with subtle glow
- Textarea for detailed messages (rows-6 minimum)
- Required field indicators
- Large submit button at bottom
- Success/error states with Heroicons feedback icons

### Timeline/Process Component (Timeframes Page)
- Vertical timeline with numbered steps
- Circle indicators connected by vertical line
- Step title, description, and turnaround time
- Icons representing each service type (Heroicons)

### Footer
- Multi-column layout (4 columns desktop, 2 tablet, 1 mobile)
- Columns: Quick Links, Services, Company, Contact
- Social media icons with hover effects (Font Awesome or Heroicons)
- Newsletter signup form embedded
- Copyright and policy links at bottom
- Logo repeated in footer

---

## Page-Specific Layouts

**Homepage**: 
- Hero with large image and dual CTAs
- "Why Choose ApexVerse" section (3-column features)
- Service tier overview (3 cards)
- Portfolio preview (6-image grid with "View All" CTA)
- Founder intro (condensed bios with photos)
- Testimonial section if available
- Final CTA section: "Ready to Get Started?"

**About Us**:
- Text hero with mission statement
- Mark and Birdie detailed bios (alternating image-text layout)
- "Our Philosophy" section
- Timeline of ApexVerse journey if applicable

**Services**:
- Service tier comparison overview at top
- Tabbed or accordion interface for A La Carte services
- Detailed Launch Kit breakdowns (2-column comparison)
- Full Service Contract showcase with comprehensive feature list
- FAQ section addressing common questions

**Pricing Guide**:
- Pricing table cards for all tiers
- Separate sections: A La Carte, Launch Kits, Full Service
- Payment structure callouts
- "Questions about pricing?" CTA to contact

**Portfolio**:
- Filter/category buttons at top
- Masonry gallery with lightbox
- Project count indicator
- Load more or pagination

**Interest Form**:
- Embedded Google Form with custom styling to match brand
- Introductory text explaining next steps
- Alternative contact methods listed below form

---

## Images Strategy

**Hero Images**: 
- Homepage: Large, high-quality image of books, artwork, or creative workspace (illustrative, inspiring)
- Interior pages: Subtle background patterns or gradient overlays instead of photos

**About Us**: Professional but approachable portraits of Mark and Birdie (circular crop)

**Portfolio**: 15-20 sample images across categories (character art, book covers, promotional graphics, chapter headers)

**Service Icons**: Use Heroicons throughout for consistency (no custom SVG generation)

---

## Interaction Patterns

**Minimal Animation Strategy**:
- Fade-in on scroll for sections (subtle, once)
- Card hover: slight lift with shadow increase
- Button hover: subtle background shift (native states)
- Navigation: smooth scroll to sections
- Portfolio: smooth lightbox open/close
- NO complex scroll-triggered animations, parallax, or excessive motion

**Accessibility**:
- Maintain WCAG AA contrast ratios throughout
- All interactive elements keyboard accessible
- Form labels properly associated
- Alt text for all images
- Focus states visible and clear

---

## Responsive Strategy

**Breakpoints**:
- Mobile: base (< 768px) - single column, stacked layouts
- Tablet: md (768px+) - 2 columns where applicable
- Desktop: lg (1024px+) - full multi-column layouts

**Mobile Optimizations**:
- Hamburger navigation
- Stacked service cards
- Single-column portfolio
- Simplified pricing tables
- Touch-friendly button sizes (min-h-12)

---

**Final Note**: This design balances literary elegance (Cinzel typography) with modern clarity (Poppins, clean layouts) to appeal to authors while demonstrating ApexVerse's creative capabilities through rich portfolio showcases and thoughtful service presentations.